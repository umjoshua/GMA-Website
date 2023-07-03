import React, { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";
import { useLocation } from "react-router-dom";
import Cart from "../../components/Cart/Cart";

function RegisterPage() {
  const [activeButton, setActiveButton] = useState(null);

  const handleActive = (buttonId) => {
    setActiveButton(buttonId);
  };
  const location = useLocation();
  const { eventName, amount } = location.state;

  console.log(eventName,amount);

  return (
    <div className="register_page">
      <div className="register_title">
        <h1>Checkout</h1>
        <span>How would you like to pay?</span>
        <div className="pay_methods">
          <button
            className={activeButton === 1 ? "active" : ""}
            onClick={() => handleActive(1)}
          >
            CARD
          </button>
          <button
            className={activeButton === 2 ? "active" : ""}
            onClick={() => handleActive(2)}
          >
            PayPal
          </button>
          <button
            className={activeButton === 3 ? "active" : ""}
            onClick={() => handleActive(3)}
          >
            GPay
          </button>
        </div>
      </div>

      <div className="reg_title">
        <h3>Registration Details</h3>
      </div>
      <div className="register_form_container">
        <div className="register_form">
          <RegisterForm title={eventName} amount={amount}/>
        </div>
        <div className="cart">
          <Cart title={eventName} amount={amount}/>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
