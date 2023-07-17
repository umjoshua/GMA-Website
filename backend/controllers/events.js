import { EventRegModel, EventModel } from "../models/eventModel.js";

import HandleTicketGeneration from "./ticket.js";

import qr from "qrcode";


export const CalculateAmount = (tickets, ticketType, ticketCount) => {
    let amount = 0;

    const ticket = tickets.find(obj => obj.name.toString() === ticketType);
    ticket.pricing.forEach(element => {
        if (ticketCount[element.name]) {
            amount += Number(element.price) * Number(ticketCount[element.name])
        }
    });

    return amount;
}



export const RegisterEvent = async (req, res) => {
    try {
        let success = false;
        let amount = 0;

        let regData = req?.body;

        const eventId = regData.event_id;

        const { ticketType, ticketCount } = regData;

        let response = await EventModel.findById(eventId, 'title event_location state country tickets event_date event_time terms');

        const ticket = response.tickets.find(obj => obj.name.toString() === ticketType);

        amount = CalculateAmount(response?.tickets, ticketType, ticketCount);

        regData.amount = amount;
        if (amount === 0) {
            const newData = new EventRegModel(regData);
            await newData.save()
            regData.regId = newData._id;
            res.status(200).json({ "msg": "Added" });
            success = true;
        }

        if (success) {
            const ticketData = {
                regId: regData.regId.toString(),
                eventName: response.title,
                location: response.event_location + ', ' + response.state + ', ' + response.country,
                when: response.event_date + ', ' + response.event_time,
                name: regData.firstName + ' ' + regData.lastName,
                email: regData.email,
                section: regData.ticketType,
                ticketCount: regData.ticketCount,
                pricing: ticket.pricing,
                terms: response.terms,
            }
            qr.toDataURL(ticketData.regId, { errorCorrectionLevel: 'H' }).then((qrCodeData) => {
                ticketData.qrCodeData = qrCodeData;
                HandleTicketGeneration(ticketData);
            }).catch((error) => {
                console.error('Error generating QR code:', error);
                HandleTicketGeneration(ticketData);
            });
        }
    } catch (error) {
        res.status(500).send();
        return
    }
}

export const GetEvents = async (req, res) => {
    try {
        let response = await EventModel.find();
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Internal server error" })
    }
}