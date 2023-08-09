import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
        user: `${process.env.MAIL_USER}`,
        pass: `${process.env.MAIL_PASS}`,
    }
});

const SendEmail = async (data) => {
    const info = await transporter.sendMail({
        from: '"GMA" <joshuatest58@gmail.com>',
        to: data.reciever,
        subject: data.subject,
        text: data.text,
        html: data?.html || '',
        attachments: data.attachments
    });
    console.log("Message sent: %s", info.messageId);
}

export default SendEmail