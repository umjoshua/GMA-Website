import React from "react";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Cart({ title, amountAdult, amountChild, adultCount, childCount }) {
  let subTotal = (amountAdult * adultCount) + (amountChild * childCount)
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
          <span>Adult Fee: $ {amountAdult}</span>
          <br />
          <span>Child Fee: $ {amountChild}</span>
        </div>
      </div>
      <div className="fare">
        <div>
          <div className="fare_division">
            <span style={{ fontWeight: "bold" }}>Ticket Count: </span>
            <div className="count">
              <span>Adult x {adultCount}</span>
              <span>Child x {childCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="subtotal">
        <span>Subtotal: $ {subTotal}</span>
      </div>
    </div>
  );
}

export default Cart;
