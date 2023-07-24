import pdf from "pdf-creator-node"
import SendEmail from "./mail.js";
import fs from "fs";

const HandleTicketGeneration = async (data) => {
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
                        border: 1px solid black;
                        border-radius: 10px;
                        display: -webkit-flex;
                        flex-direction: row; 
                        justify-content: space-between; 
                    }
                    
                    .second{
                        padding: 5px;
                        flex-direction: column;
                        align-items: start;
                        width: 80%;
                    }
    
                    .ticket h3{
                        margin-bottom: 10px;
                        font-weight: bolder;
                    }
    
                    .ticket p {
                        font-size: 12px;
                        margin-bottom: 5px;
                    }
                    .last{
                      font-size: 8px;
                      width: 100%;
                      display: -webkit-flex;
                      text-align: center;
                      justify-content: center;
                      padding: 5px;
                    }
                    .terms{
                      font-size: 8px;
                      white-space: pre-wrap;
                    }
                    .third img{
                      padding: 10px;
                      width: 90px;
                      height: 90px;
                    }
                    .item {
                      width: 100%;
                    }
                    .sub{
                      font-weight: bold;
                    }
                </style>
      </head>`;

  for (const [key, value] of Object.entries(ticketCount)) {
    const price = pricingMap.get(key);
    for (let i = 0; i < value; i++) {
      htmlContent += `
      <div style="padding: 5px; page-break-after: always;">
        <div class="first">
          <h6>Ticket</h6>
        </div>
      <div class="ticket">
          <div class="second">
              <h3>${data.eventName}</h3>
              <p class="item">
                  <span class="sub">VENUE: </span> <span class="sub-item"> ${data.location}</span>
              </p>
              <p class="item">
                  <span class="sub">WHEN: </span> ${data.when}
              </p>
              <p class="item">
                  <span class="sub">PRICE: </span> ${key} - AUD ${price}
              </p>
              <p class="item">
                  <span class="sub">BOOKED BY: </span> ${data.name}
              </p>
              <p class="item">
                  <span class="sub">SECTION: </span> ${data.section}
              </p>
              <span class="last">USE OF THIS TICKET MEANS THAT THE ATTENDEE IS
                  BOUND BY ALL EVENT ORGANISER TERMS AND CONDITIONS</span>
          </div>
          <div class="third">
              <img src=${data.qrCodeData} alt="QR Code" />
          </div>
      </div>
      <h4>Terms and Conditions</h4>
      <div class="terms">
          ${data.terms}
      </div>
  </div>`;
    }
  }

  htmlContent += `
          </body>
      </html>`;


  var document = {
    html: htmlContent,
    data: {
      data: [],
    },
    type: "buffer"
  }

  let pdfBuffer = ""

  try {
    const res = await pdf.create(document, {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null',
        },
      }
    });
    pdfBuffer = res;
  } catch (error) {
    console.log(error)
  }

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
