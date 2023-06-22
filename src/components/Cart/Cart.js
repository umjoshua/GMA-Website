import React from "react";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Cart({title, amount}) {
  return (
    <div className="cart_container">
      <div className="cart_title">
        <ShoppingCartIcon />
        <span>Your Cart</span>
      </div>
      <div className="cart_inside">
        <div className="cart_event">
          <h3>{title}</h3>
        </div>
        <div className="cart_event">
          <span>Price: {amount}</span>
        </div>
      </div>
      <div className="fare">
        <div>
          <div className="fare_division">
            <span>Ticket: </span>
            <span>{amount}</span>
          </div>
          <div className="fare_division">
            <span>Ticket Fee:</span>
            <span>$1.00</span>
          </div>
          <div className="fare_division">
            <span>Processing Fee: </span>
            <span>$1.75</span>
          </div>
        </div>
      </div>
      <div className="subtotal">
        <span>SUBTOTAL: $22.75</span>
      </div>
    </div>
  );
}

export default Cart;
