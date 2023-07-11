import { EventRegModel, EventModel } from "../models/eventModel.js";

export const RegisterEvent = async (req, res) => {
    try {
        const regData = req.body;
        const eventId = req.params.id;
        regData.eventId = eventId;
        const newData = new EventRegModel(regData);
        await newData.save()
        res.json(regData);
    } catch (err) {
        console.log(err)
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