import { EventModel, } from "../models/eventModel.js";
import { CommitteeModel } from "../models/committeeModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from "../models/adminModel.js"
import mongoose from "mongoose";


export const CreateEvent = async (req, res) => {
    try {
        const data = req.body;
        const newData = new EventModel(data);
        await newData.save()
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ "error": "Couldn't add" })
    }
}

export const DeleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Event with this id');

    await EventModel.findByIdAndRemove(id);

    res.json({ message: 'post deleted succesfully' });
}

export const UpdateEvent = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Event with this id');

    const updatedEvent = req.body;
    await EventModel.findByIdAndUpdate(id, updatedEvent, { new: true });

    res.json(updatedEvent);
}

export const AddCommittee = async (req, res) => {
    try {
        const data = req.body;
        const newData = new CommitteeModel(data);
        await newData.save()
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ "error": "Couldn't add" })
    }
}

export const DeleteCommittee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Event with this id');

    await CommitteeModel.findByIdAndRemove(id);

    res.json({ message: 'post deleted succesfully' });
}

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await AdminModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: 'incorrect username' });
        }
        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res.status(401).json({ msg: 'incorrect password' });
        }

        const payload = {
            id: user._id,
        };

        const signOptions = {
            expiresIn: "23h",
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            signOptions
        );

        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}