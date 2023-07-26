import { EventModel, } from "../models/eventModel.js";
import { CommitteeModel } from "../models/committeeModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from "../models/adminModel.js"
import mongoose from "mongoose";
import GalleryModel from "../models/galleryModel.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";


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
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Event with this id');

        await EventModel.findByIdAndRemove(id);

        res.json({ message: 'post deleted succesfully' });
    } catch (error) {
        res.status(500).json({ "error": "Couldn't delete" })
    }
}

export const UpdateEvent = async (req, res) => {

    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Event with this id');

        const updatedEvent = req.body;
        await EventModel.findByIdAndUpdate(id, updatedEvent, { new: true });

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ "error": "Couldn't update" })
    }
}

export const AddCommittee = async (req, res) => {
    try {
        const data = req.body;
        const filename = uuidv4();

        const imageData = data.file.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(imageData, 'base64');
        const imagePath = `uploads/images/${filename}.png`;

        fs.writeFileSync(imagePath, imageBuffer);

        data.file = `${filename}.png`;
        const newData = new CommitteeModel(data);
        await newData.save();
        const committees = await CommitteeModel.find();
        const response = committees.map((committee) => {
            const filename = committee.file
            const imageUrl = `http://localhost:5000/uploads/images/${filename}`;
            return { ...committee.toObject(), imageUrl };
        });
        res.status(200).json(response);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Couldn't add" });
    }
};


export const DeleteCommittee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No member with this id');
        }

        // Find the committee by id to get the imagePath
        const committee = await CommitteeModel.findById(id);
        if (!committee) {
            return res.status(404).send('Committee not found');
        }

        // Delete the image file from the disk
        const imagePath = `uploads/images/${committee.file}`;
        if (imagePath) {
            fs.unlinkSync(imagePath);
        }

        // Delete the committee from MongoDB
        await CommitteeModel.findByIdAndRemove(id);

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: "Couldn't delete" });
    }
};


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

export const AddGalleryImage = async (req, res) => {
    try {
        const data = req.body;
        const newData = new GalleryModel(data);
        await newData.save()
        res.status(200).json(newData);
    } catch (err) {
        res.status(500).json({ "error": "Couldn't add" })
    }
}

export const DeleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with this id');
        await GalleryModel.findByIdAndRemove(id);
        res.json({ message: 'image deleted succesfully' });
    } catch (error) {
        res.status(500).json({ "error": "Couldn't delete" })
    }
}