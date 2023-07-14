import puppeteer from "puppeteer";
import fs from "fs";
import SendEmail from "./mail.js";

const HandleTicketGeneration = async (data) => {
  console.log("handle ticket generation");
    const { ticketCount, pricing } = data;
    const pricingMap = new Map(pricing.map(item => [item.name, item.price]));
    let htmlContent = `
      <!DOCTYPE html>
      <html>
          <head>
              <title>Ticket</title>
              <style>
                  @page {
                    margin: 1cm;
                  }
                  .ticket {
                      width: 100%;
                      margin-right: 20px;
                      border: 2px solid black;
                      text-align: center;
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                  }
                  .first{
                      padding-left: 10px;
                  }
                  
                  .second{
                      margin:0px 20px 0px 20px;
                      display: flex;
                      flex-direction: column;
                      align-items: start;
                  }
  
                  .ticket h1 {
                      font-size: 24px;
                      margin-bottom: 10px;
                  }
  
                  .ticket p {
                      font-size: 12px;
                      margin-bottom: 5px;
                  }
                  .last{
                    font-size: 9px;
                  }
                  .terms{
                    white-space: pre-wrap;
                  }
                  .third{

                  }
              </style>
          </head>
          <body>`;

    for (const [key, value] of Object.entries(ticketCount)) {
        const price = pricingMap.get(key);
        for (let i = 0; i < value; i++) {
            htmlContent += `
          <div style="padding: 5px; page-break-after: always;">
            <div class="ticket">
              <div class="first">
                <h1>Ticket</h1>
              </div>
              <div class="second">
                <h1>"${data.eventName}"</h1>
                <p>VENUE: "${data.location}"</p>
                <p>WHEN: "${data.when}"</p>
                <p>PRICE: ${key} - AUD ${price}</p>
                <p>BOOKED BY: ${data.name}</p>
                <p>SECTION: ${data.section}</p>
                <span class="last">USE OF THIS TICKET MEANS THAT THE ATTENDEE IS BOUND BY ALL EVENT ORGANISER TERMS AND CONDITIONS</span>
              </div>
              <div class="third">
                <img src="${data.qrCodeData}" alt="QR Code" />
                </div>
            </div>
            <h4>Terms and Conditions</h4>
              <div class="terms">
              "${data.terms}"
              </div>
          </div>`;
        }
    }

    htmlContent += `
          </body>
      </html>`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    // reciever, subject, text, attachments

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
                contentType: "application/pdf"
            }
        ]
    }

    await SendEmail(EmailData)

}

export default HandleTicketGeneration
