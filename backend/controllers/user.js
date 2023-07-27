import { CommitteeModel } from "../models/committeeModel.js";
import { EventRegModel, EventModel } from "../models/eventModel.js";
import GalleryModel from "../models/galleryModel.js"

import SendEmail from "../controllers/mail.js";

import HandleTicketGeneration from "./ticket.js";

import qr from "qrcode";


export const CalculateAmount = (tickets, ticketType, ticketCount) => {
    let amount = 0;

    const ticket = tickets.find(obj => obj.name.toString() === ticketType);
    ticket.pricing.forEach(element => {
        if (ticketCount[element.name]) {
            amount += Number(element.price) * Number(ticketCount[element.name])
        }
    });

    return amount;
}

export const RegisterEvent = async (req, res) => {
    try {
        let success = false;
        let amount = 0;

        let regData = req?.body;

        const eventId = regData.event_id;

        const { ticketType, ticketCount } = regData;

        let response = await EventModel.findById(eventId, 'title event_location state country tickets event_date event_time terms');

        const ticket = response.tickets.find(obj => obj.name.toString() === ticketType);

        amount = CalculateAmount(response?.tickets, ticketType, ticketCount);

        regData.amount = amount;
        if (amount === 0) {
            const newData = new EventRegModel(regData);
            await newData.save()
            regData.regId = newData._id;
            res.status(200).json({ "msg": "Added" });
            success = true;
        }

        if (success) {
            const ticketData = {
                regId: regData.regId.toString(),
                eventName: response.title,
                location: response.event_location + ', ' + response.state + ', ' + response.country,
                when: response.event_date + ', ' + response.event_time,
                name: regData.firstName + ' ' + regData.lastName,
                email: regData.email,
                section: regData.ticketType,
                ticketCount: regData.ticketCount,
                pricing: ticket.pricing,
                terms: response.terms,
            }
            qr.toDataURL(ticketData.regId, { errorCorrectionLevel: 'H' }).then((qrCodeData) => {
                ticketData.qrCodeData = qrCodeData;
                HandleTicketGeneration(ticketData);
            }).catch((error) => {
                console.error('Error generating QR code:', error);
                HandleTicketGeneration(ticketData);
            });
        }
    } catch (error) {
        res.status(500).send();
        return
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

export const GetCommittee = async (req, res) => {
    try {
        const committees = await CommitteeModel.find();
        const response = committees.map((committee) => {
            const filename = committee.file
            const imageUrl = filename !== "" ? `${process.env.URL}/uploads/images/${filename}` : "";
            return { ...committee.toObject(), imageUrl };
        });
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const GetGallery = async (req, res) => {
    try {
        let response = await GalleryModel.find();
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Internal server error" })
    }
}

export const GetSwiperData = async (req, res) => {
    try {
        let response = await GalleryModel.find().sort({ _id: -1, }).limit(6);
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Internal server error" })
    }
}


export const ContactUs = async (req, res) => {
    console.log(req.body);
    console.log('hii')
    const text = `
    Name: ${req.body.name ? req.body.name : 'NA'}
    Phone: ${req.body.phone ? req.body.phone : 'NA'}
    Email: ${req.body.email ? req.body.email : 'NA'}
    Message: ${req.body.message ? req.body.message : 'NA'}
    `
    const data = {
        reciever: process.env.MAIL_RECIEVER,
        subject: "New message on 'Contact Us'",
        text,
        attachments: [],
    }
    await SendEmail(data);
    res.status(200).json({ "msg": "success" })
}


export const MembershipRegister = async (req, res) => {
    const text = `
    Applicant Information:
    First Name: ${req.body.fname ? req.body.fname : 'NA'}
    Middle Name: ${req.body.mname ? req.body.mname : 'NA'}
    Last Name: ${req.body.lname ? req.body.lname : 'NA'}

    Address:
    Address Line 1: ${req.body.address1 ? req.body.address1 : 'NA'}
    Address Line 2: ${req.body.address2 ? req.body.address2 : 'NA'}
    Suburb: ${req.body.suburb ? req.body.suburb : 'NA'}
    State: ${req.body.state ? req.body.state : 'NA'}
    Post Code: ${req.body.postCode ? req.body.postCode : 'NA'}
    Country: ${req.body.country ? req.body.country : 'NA'}
    
    Phone Number: ${req.body.phNo ? req.body.phNo : 'NA'}
    
    Email: ${req.body.email ? req.body.email : 'NA'}
    
    Gender: ${req.body.gender ? req.body.gender : 'NA'}
    
    Age: ${req.body.age ? req.body.age : 'NA'}
    
    Blood Group: ${req.body.bloodGroup ? req.body.bloodGroup : 'NA'}
    
    Emergency Contact Details in Kerala / India:
    First Name: ${req.body.keralaContactfname ? req.body.keralaContactfname : 'NA'}
    Last Name: ${req.body.keralaContactlname ? req.body.keralaContactlname : 'NA'}
    Phone Number: ${req.body.keralaContactphNo ? req.body.keralaContactphNo : 'NA'}

    Name of Spouce:
    First Name: ${req.body.spouceFname ? req.body.spouceFname : 'NA'}
    Middle Name: ${req.body.spouceMname ? req.body.spouceMname : 'NA'}
    Last Name: ${req.body.spouceLname ? req.body.spouceLname : 'NA'}
    Phone Number: ${req.body.spoucePhNo ? req.body.spoucePhNo : 'NA'}
    Email: ${req.body.spouceEmail ? req.body.spouceEmail : 'NA'}

    Details of other family members in your household and kids under 13 years:
    ${req.body.familyDetails ? req.body.familyDetails : 'NA'}

    Preferred Method of contact:
    ${req.body.contactMethod ? req.body.contactMethod : 'NA'}

    Type of membership:
    ${req.body.membershipType ? req.body.membershipType : 'NA'}

    Membership fee paid?
    ${req.body.membershipFeePaid ? req.body.membershipFeePaid : 'NA'}
    `
    const data = {
        reciever: process.env.MAIL_RECIEVER,
        subject: "New Membership Registration",
        text,
        attachments: [],
    }
    await SendEmail(data);
    res.status(200).json({ "msg": "success" });
}