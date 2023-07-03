import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    conductedBy: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: Date, required: true },
    fee: { type: Number, require: true },
})

