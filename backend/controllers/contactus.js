import SendEmail from "./mail.js";

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