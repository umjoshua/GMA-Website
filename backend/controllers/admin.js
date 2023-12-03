import { EventModel, EventRegModel } from "../models/eventModel.js";
import { CommitteeModel } from "../models/committeeModel.js"
import AddressModel from '../models/addressModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from "../models/adminModel.js"
import mongoose from "mongoose";
import GalleryModel from "../models/galleryModel.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import sharp from 'sharp';
import exceljs from "exceljs";


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

        await EventRegModel.deleteMany({ event_id: id });

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

        const filename = data.file === "" ? "" : uuidv4();

        if (filename !== "") {
            const imageData = data.file.replace(/^data:image\/\w+;base64,/, '');
            const imageBuffer = Buffer.from(imageData, 'base64');
            const pngImageBuffer = await sharp(imageBuffer).toFormat('png').toBuffer();
            const imagePath = `uploads/images/${filename}.png`;
            fs.writeFileSync(imagePath, pngImageBuffer);
            data.file = `${filename}.png`;
        }

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

        const committee = await CommitteeModel.findById(id);
        if (!committee) {
            return res.status(404).send('Committee not found');
        }

        await CommitteeModel.findByIdAndRemove(id);

        const imagePath = `uploads/images/${committee.file}`;
        if (imagePath && committee.file !== "") {
            fs.unlinkSync(imagePath);
        }

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

        const filename = data.file === "" ? "" : uuidv4();

        if (filename !== "") {
            const imageData = data.file.replace(/^data:image\/\w+;base64,/, '');
            const imageBuffer = Buffer.from(imageData, 'base64');
            const pngImageBuffer = await sharp(imageBuffer).toFormat('png').toBuffer();
            const imagePath = `uploads/images/${filename}.png`;
            fs.writeFileSync(imagePath, pngImageBuffer);
            data.file = `${filename}.png`;
        }

        const newData = new GalleryModel(data);
        await newData.save();

        const gallery = await GalleryModel.find();
        const response = gallery.map((item) => {
            const filename = item.file
            const imageUrl = filename !== "" ? `${process.env.URL}/uploads/images/${filename}` : "";
            return { ...item.toObject(), imageUrl };
        });
        res.status(200).json(response);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Couldn't add" });
    }
}

export const DeleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No member with this id');
        }

        const gallery = await GalleryModel.findById(id);
        if (!gallery) {
            return res.status(404).send('Committee not found');
        }

        await GalleryModel.findByIdAndRemove(id);

        const imagePath = `uploads/images/${gallery.file}`;
        if (imagePath && gallery.file !== "") {
            fs.unlinkSync(imagePath);
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: "Couldn't delete" });
    }
}

export const GetEventsList = async (req, res) => {
    try {
        let events = await EventModel.find({}, { _id: 1, title: 1, tickets: 1 });
        console.log(events);
        let registrations = await EventRegModel.find();

        const groupedRegistrations = registrations.reduce((acc, reg) => {
            const eventId = reg.event_id.toString();
            if (!acc[eventId]) {
                acc[eventId] = {
                    totalRegistrations: 1,
                    ticketTypeCounts: {},
                };
            } else {
                acc[eventId].totalRegistrations++;
            }

            const ticketCounts = Object.values(reg.ticketCount);
            ticketCounts.forEach((count, index) => {
                const ticketType = Object.keys(reg.ticketCount)[index];
                acc[eventId].ticketTypeCounts[ticketType] =
                    (acc[eventId].ticketTypeCounts[ticketType] || 0) + count;
            });

            return acc;
        }, {});

        const eventListWithTotals = events.map((event) => {
            const eventId = event._id.toString();
            const ticketsLeft = event.tickets.reduce((acc, ticket) => {
                acc[ticket.name] = ticket.ticketsLeft;
                return acc;
            }, {});

            return {
                _id: eventId,
                title: event.title,
                totalRegistrations: groupedRegistrations[eventId]
                    ? groupedRegistrations[eventId].totalRegistrations
                    : 0,
                ticketTypeCounts: groupedRegistrations[eventId]
                    ? groupedRegistrations[eventId].ticketTypeCounts
                    : {},
                ticketsLeft: ticketsLeft,
            };
        });

        res.json(eventListWithTotals);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch event list' });
    }
};

export const GetEventRegData = async (req, res) => {
    try {
        const { id } = req.params;
        const rgd = await EventRegModel.find({ event_id: id })

        const workbook = new exceljs.Workbook()
        const worksheet = workbook.addWorksheet('Registration Data');

        const headerRow = worksheet.addRow([
            'Booking ID',
            'Name',
            'Address',
            'Country',
            'Phone',
            'Email',
            'Ticket Type',
            'Pricing Category',
            'Ticket Count',
            'Payment Method'
        ])

        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
        });

        for (const registration of rgd) {
            const ticketCount = registration.ticketCount;
            const name = `${registration.firstName || ''} ${registration.lastName || ''}`;
            const address = `${registration.address || ''}, ${registration.suburb || ''}, ${registration.postcode || ''}`;

            for (const [ticketType, count] of Object.entries(ticketCount)) {
                worksheet.addRow([
                    registration._id.toString(),
                    name,
                    address,
                    registration.country || 'N/A',
                    registration.phone || 'N/A',
                    registration.email || 'N/A',
                    registration.ticketType || 'N/A',
                    ticketType,
                    count,
                    registration.paymentMethod || 'N/A',
                ]);
            }
        }


        res.setHeader(
            'Content-Disposition',
            'attachment; filename=registration_data.xlsx'
        )

        await workbook.xlsx.write(res);

        res.end();
    } catch (error) {
        console.log(error)
        res.status(500).json({ "msg": "Couldn't process the download request" })
    }
}


export const UpdatePhone = async (req, res) => {
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