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

            let ticketsLeft = ticket.ticketsLeft;

            const pricingMap = new Map(ticket?.pricing.map(item => [item.name, item.price]))

            Object.entries(ticketCount).forEach(([name, value]) => {
                const price = pricingMap.get(name);
                if (price !== undefined && price > 0) {
                    ticketsLeft -= value;
                }
            })

            await EventModel.findOneAndUpdate(
                { _id: eventId, 'tickets._id': ticket._id },
                { $set: { 'tickets.$.ticketsLeft': ticketsLeft } },
                { new: true }
            )

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
        const gallery = await GalleryModel.find();
        const response = gallery.map((item) => {
            const filename = item.file
            const imageUrl = filename !== "" ? `${process.env.URL}/uploads/images/${filename}` : "";
            return { ...item.toObject(), imageUrl };
        });
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export const GetSwiperData = async (req, res) => {
    try {
        let gallery = await GalleryModel.find().sort({ _id: -1, }).limit(6);
        const response = gallery.map((item) => {
            const filename = item.file
            const imageUrl = filename !== "" ? `${process.env.URL}/uploads/images/${filename}` : "";
            return { ...item.toObject(), imageUrl };
        });
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Internal server error" })
    }
}


export const ContactUs = async (req, res) => {
    console.log(req.body);
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
    const html = `
    <table style='border-spacing:0 10px;'>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">
                Name of the Applicant: 
            </td>
            <td style="vertical-align: top; width:300px;">${req.body.fname || ' '} ${req.body.mname || ''} ${req.body.lname || ' '}</td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Address: </td>
            <td style="vertical-align: top; width:300px;">
                ${req.body.address1 + '<br>' || ''}
                ${req.body.address2 + '<br>' || ''}
                ${req.body.suburb + '<br>' || ''}
                ${req.body.state + '<br>' || ''}
                ${req.body.postCode + '<br>' || ''}
                ${req.body.country || ''}
            </td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Phone Number: </td>
            <td style="vertical-align: top; width:300px;">${req.body.phNo || ''}</td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Email: </td>
            <td style="vertical-align: top; width:300px;">${req.body.email || ''}</td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Gender: </td>
            <td style="vertical-align: top; width:300px;">${req.body.gender || ''}</td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Age: </td>
            <td style="vertical-align: top; width:300px;">${req.body.age || ''}</td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Blood Group: </td>
            <td style="vertical-align: top; width:300px;">${req.body.bloodGroup || ''}</td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Emergency Contact Details in Kerala / India: </td>
            <td style="vertical-align: top; width:300px;">
                ${req.body.keralaContactfname || ''}
                ${req.body.keralaContactlname + '<br>' || ''}
                ${req.body.keralaContactphNo + '<br>' || ''}
            </td>
        </tr>
        ${(req.body.spouceFname || req.body.spouceMname || req.body.spouceLname) ?
            "<tr style='margin-bottom: 20px'> <td style = 'vertical-align: top; font-weight:bold'>Name of Spouce: </td> <td style='vertical-align: top;'>" +
            req.body.spouceFname || ' ' + req.body.spouceMname || '' + req.body.spouceLname || ' ' +
            "</td></tr >"
            : ''
        }
        ${(req.body.spoucePhNo) ?
            "<tr style='margin-bottom: 20px'> <td style = 'vertical-align: top; font-weight:bold'>Spouce Phone Number: </td><td style='vertical-align: top;'>" +
            req.body.spoucePhNo || ' ' +
            "</td></tr >"
            :
            ''
        }
        ${(req.body.spouceEmail) ?
            "<tr style='margin-bottom: 20px'> <td style = 'vertical-align: top; font-weight:bold'>Spouce Email: </td> <td style='vertical-align: top;'>" + req.body.spouceEmail || ' ' + "</td></tr >"
            :
            ''
        }
        ${(req.body.familyDetails) ?
            "<tr style='margin-bottom: 20px'> <td style = 'vertical-align: top; font-weight:bold'> Details of Children: </td> <td style='vertical-align: top;'>"+req.body.familyDetails || ' '+"</td></tr >"
            :
            ''
        }
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Preferred Method of contact: </td>
            <td style="vertical-align: top; width:300px;">
                ${req.body.contactMethod || ''}
            </td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Type of membership: </td>
            <td style="vertical-align: top; width:300px;">
                ${req.body.membershipType || ''}
            </td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">Membership fee paid? </td>
            <td style="vertical-align: top; width:300px;">
                ${req.body.membershipFeePaid || ''}
            </td>
        </tr>
        <tr style='margin-bottom: 20px'>
            <td style="vertical-align: top; font-weight:bold; width: 300px;">
                By ticking this box I agree that I have read, understood and abide the rules of Geelong Malayalee Association (GMA). I also agree to be a member of Geelong Malayalee Association (GMA) and my details can be entered in the membership register. I am aware that these details can be used to send membership fee notices and other communications including information about meeting and events organized or supported by Geelong Malayalee Association (GMA). Geelong Malayalee Association (GMA) and it's office bearers respects your privacy seriously and are aware that it is an offence to make improper use of information about a person obtained from the Register of Members as per Section 58 of the Associations Incorporation Reform act 2012.
            </td>
            <td style="vertical-align: top; width:300px;">
                I have read, understood, and accepted the rules of membership.
                <br>
                I confirm that all the above information are correct and true to best of my knowledge and belief.
            </td>
        </tr>
    </table >

    `
    const data = {
        reciever: process.env.MAIL_RECIEVER,
        subject: "GMA - Application for Membership",
        html,
        attachments: [],
    }
    await SendEmail(data);
    res.status(200).json({ "msg": "success" });
}