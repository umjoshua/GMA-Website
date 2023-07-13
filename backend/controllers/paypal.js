import fetch from "node-fetch";
import { EventRegModel, EventModel } from "../models/eventModel.js";
import { CalculateAmount } from "./events.js";
import HandleTicketGeneration from "./ticket.js";
import qr from "qrcode";
import dotenv from "dotenv"

dotenv.config()

const { CLIENT_ID, APP_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";


const generateAccessToken = async () => {
    try {
        const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "post",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

const createOrder = async (amount) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: amount,
                },
            },
        ],
    };

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};


const capturePayment = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });

    return handleResponse(response);
};

async function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
}


export const Order = async (req, res) => {
    try {
        let amount = 0;
        let regData = req.body;

        const eventId = regData.event_id;
        const { ticketType, ticketCount } = regData;
        let eventData = await EventModel.findById(eventId, 'tickets');
        amount = CalculateAmount(eventData?.tickets, ticketType, ticketCount);
        regData.amount = amount;
        const response = await createOrder(amount);
        res.json(response);

    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
}

export const Capture = async (req, res) => {
    try {
        let regData = req.body;
        let amount = 0;
        const { orderID } = req.params;
        const response = await capturePayment(orderID);

        try {
            const eventId = regData.event_id;

            let eventDetails = await EventModel.findById(eventId, 'title event_location state country tickets event_date event_time terms');

            const { ticketType, ticketCount } = regData;

            let eventData = await EventModel.findById(eventId, 'tickets');
            console.log(eventData);
            amount = CalculateAmount(eventData?.tickets, ticketType, ticketCount);
            regData.amount = amount;

            const ticket = eventData.tickets.find(obj => obj.name.toString() === ticketType);
            const newData = new EventRegModel(regData);
            await newData.save();
            regData.regId = newData._id;

            const ticketData = {
                regId: regData.regId.toString(),
                eventName: eventDetails.title,
                location: eventDetails.event_location + ' ' + eventDetails.state + ' ' + eventDetails.country,
                when: eventDetails.event_date + ' ' + eventDetails.event_time,
                name: regData.firstName + ' ' + regData.lastName,
                email: regData.email,
                section: regData.ticketType,
                ticketCount: regData.ticketCount,
                pricing: ticket.pricing,
                terms: eventDetails.terms,
            }

            qr.toDataURL(ticketData.regId, { errorCorrectionLevel: 'H' }).then((qrCodeData) => {
                ticketData.qrCodeData = qrCodeData;
                HandleTicketGeneration(ticketData);
            }).catch((error) => {
                console.error('Error generating QR code:', error);
                HandleTicketGeneration(ticketData);
            });
        } catch (err) {
            console.log(err);
        }

        res.json(response);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
}
