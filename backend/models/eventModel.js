import mongoose, { Schema } from "mongoose";

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    conductedBy: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    fee: { type: Number, require: true },
})

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