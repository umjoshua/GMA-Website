import React from "react";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Cart({ event, registrationData, pfee, total }) {
  const ticket = event.tickets.find(ticket => ticket.name === registrationData.ticketType);

  let payableTickets = 0;

  Object.entries(registrationData.ticketCount).forEach(([key, value]) => {
    if (registrationData.ticketPrice[key] !== 0) {
      payableTickets += value;
    }
  });

  return (
    <div className="cart_container">
      <div className="cart_title">
        <ShoppingCartIcon />
        <span>Your Cart</span>
      </div>
      <div className="cart_inside">
        <div className="cart_event">
          <h3>{event.title}</h3>
        </div>
        <div className="cart_event">
          {
            ticket.name
          }
        </div>
        <div className="cart_event">
          {
            Object.entries(registrationData.ticketCount).map(([key, value]) => {
              return (
                <div className="ticket_count" key={key}>
                  <div>Ticket: <span style={{ color: 'green' }}>{key} </span><span>x {value}</span></div>
                  <div style={{ placeSelf: "flex-end", padding: "10px" }}>
                    <span style={{ color: 'red' }}>Price:</span> $ {registrationData.ticketPrice[key] * value}
                  </div>
                </div>
              )
            })
          }
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ placeSelf: 'flex-end' }}>Tickets x {payableTickets}: $ {registrationData.subTotal} </span>
            <span style={{ placeSelf: 'flex-end' }}>Ticket Fee: $ 0.50 </span>
            <span style={{ placeSelf: 'flex-end' }}>Processing Fee: $ {pfee.toFixed(2)} </span>
          </div>
        </div>
      </div>
      <div className="fare">
      </div>
      <div className="subtotal">
        <span>TOTAL: $ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Cart;
