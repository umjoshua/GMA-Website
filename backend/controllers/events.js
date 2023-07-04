import { EventRegModel } from "../models/eventModel.js";

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