import mongoose, { Schema } from "mongoose";

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    event_date: { type: String, required: true },
    event_time: { type: String, required: true },
    event_location: { type: String, required: true },
    state: String,
    country: String,
    tickets: [
        {
            name: { type: String, required: true },
            description: String,
            count: Number,
            ticketsLeft: Number,
            pricing: [
                {
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                },
            ],
        },
    ],
    terms: String,
    file: String,
    regOpen: String
});

const eventRegSchema = mongoose.Schema({
    event_id: { type: Schema.Types.ObjectId },
    firstName: String,
    lastName: String,
    address: String,
    suburb: String,
    postcode: String,
    country: String,
    phone: String,
    email: String,
    ticketType: String,
    ticketCount: {},
    amount: String,
    paymentMethod: String,
})

const EventModel = mongoose.model("EventModel", eventSchema, "EventDetails")
const EventRegModel = mongoose.model("EventRegModel", eventRegSchema, "EventRegDetails")

export { EventModel, EventRegModel }