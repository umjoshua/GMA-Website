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
            pricing: [
                {
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                },
            ],
        },
    ],
    terms: String,
    poster: String,
    file: String,
});

const eventRegSchema = mongoose.Schema({
    eventId: { type: Schema.Types.ObjectId },
    fname: String,
    lname: String,
    country: String,
    phNo: String,
    address: String,
    suburb: String,
    postcode: Number,
})

const EventModel = mongoose.model("EventModel", eventSchema, "EventDetails")
const EventRegModel = mongoose.model("EventRegModel", eventRegSchema, "EventRegDetails")

export { EventModel, EventRegModel }