import { EventRegModel, EventModel } from "../models/eventModel.js";

import axios from 'axios';
import { randomUUID } from 'crypto';


const CalculateAmount = async (eventId, ticketType, ticketCount) => {
    let response = await EventModel.findById(eventId, 'tickets');
    let amount = 0;
    if (response) {
        const ticket = response.tickets.find(obj => obj.name.toString() === ticketType);
        ticket.pricing.forEach(element => {
            if (ticketCount[element.name]) {
                amount += Number(element.price) * Number(ticketCount[element.name])
            }
        });
    }
    return amount;
}


export const RegisterEvent = async (req, res) => {
    console.log("Payment request")
    console.log(req.body)
    if (req.body.data) {
        const { event_id, ticketType, ticketCount } = req.body.data;
        const regData = req.body.data;
        const amount = await CalculateAmount(event_id, ticketType, ticketCount);
        try {
            const { data } = await axios.post(
                'https://connect.squareupsandbox.com/v2/payments',
                {
                    source_id: req.body.sourceId,
                    idempotency_key: randomUUID(),
                    amount_money: {
                        amount: amount,
                        currency: 'USD'
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            try {
                const newData = new EventRegModel(regData);
                await newData.save();
                console.log(newData)
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({ "error": "Couldn't add" })
            }
        } catch (error) {
            res.status(500).send();
            return
        }
    } else {
        const regData = req.body;
        regData.amount = 0;
        const newData = new EventRegModel(regData);
        await newData.save()
        res.status(200).json({ "msg": "Added" });
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