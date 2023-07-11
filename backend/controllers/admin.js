import { EventModel, } from "../models/eventModel.js";
import { CommitteeModel } from "../models/committeeModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from "../models/adminModel.js"


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