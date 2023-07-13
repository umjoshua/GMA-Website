import React from "react";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Cart({ event, registrationData }) {

  const ticket = event.tickets.find(ticket => ticket.name === registrationData.ticketType);

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
        </div>
      </div>
      <div className="fare">
      </div>
      <div className="subtotal">
        <span>Subtotal: $ {registrationData.subTotal}</span>
      </div>
    </div>
  );
}

export default Cart;
