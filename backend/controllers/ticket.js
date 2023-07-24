import PDFDocument from 'pdfkit';
import fs from "fs";
import SendEmail from "./mail.js";

const HandleTicketGeneration = async (data) => {
    const { ticketCount, pricing } = data;
    const pricingMap = new Map(pricing.map(item => [item.name, item.price]));

    const doc = new PDFDocument(
        {
            size: 'A4',
            margins: {
                top: 30,
                left: 30,
                right: 40,
                bottom: 20
            },
            compress: false
        });


    const buffers = [];
    doc.on('data', chunk => buffers.push(chunk));
    doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);

        const EmailData = {
            reciever: data.email,
            subject: data.eventName,
            text: `
      Hi ${data.name},

      Your booking has been confirmed, please find a copy of your ticket(s) attached to this email.

      Booking ID: ${data.regId}
      Event Name: ${data.eventName}
    `,
            attachments: [
                {
                    filename: 'tickets.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        }
        SendEmail(EmailData);
    });


    function renderHeading(text) {
        doc.font('Helvetica-Bold').fontSize(18).text(text, { align: 'center' });
    }

    function renderSubHeading(text) {
        doc.font('Helvetica-Bold').fontSize(12).text(text, { align: 'left' });
    }

    function renderParagraph(text) {
        doc.font('Helvetica').fontSize(10).text(text, { align: 'left' });
    }

    function renderFooter(text) {
        doc.font('Helvetica').fontSize(10).text(text, { align: 'center' });
    }

    for (const [key, value] of Object.entries(ticketCount)) {
        const price = pricingMap.get(key);
        for (let i = 0; i < value; i++) {
            doc.font('Helvetica-Bold').fontSize(18).text('Ticket', { align: 'left' });
            doc.moveDown(1);
            doc.rect(20, doc.y - 5, doc.page.width - 30, 250).stroke();
            renderHeading(data.eventName);
            renderSubHeading('VENUE:'); renderParagraph(data.location);
            doc.image(data.qrCodeData, doc.page.width - 110, doc.y, { width: 90, height: 90 });
            doc.moveUp(7);
            renderSubHeading('WHEN:'); renderParagraph(data.when);
            doc.moveDown(0.5);
            renderSubHeading('PRICE:'); renderParagraph(`${key} - AUD ${price}`);
            doc.moveDown(0.5);
            renderSubHeading('BOOKED BY:'); renderParagraph(data.name);
            doc.moveDown(0.5);
            renderSubHeading('SECTION:'); renderParagraph(data.section);
            doc.moveDown(1);
            renderFooter('USE OF THIS TICKET MEANS THAT THE ATTENDEE IS BOUND BY ALL EVENT ORGANISER TERMS AND CONDITIONS');

            doc.moveDown(5);
            renderHeading('Terms and Conditions');
            renderParagraph(data.terms);

            if (i != value - 1) {
                doc.addPage();
            }
        }
    }

    doc.end();

};

export default HandleTicketGeneration;
