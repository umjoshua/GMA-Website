import React, { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";
import { useLocation } from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import Payment from "../../components/Payment/Payment";

function RegisterPage() {
  const [activeButton, setActiveButton] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [checkOut, setCheckOut] = useState(false)

  const handleActive = (buttonId) => {
    setActiveButton(buttonId);
  };
  const location = useLocation();
  const { eventName, amountAdult, amountChild } = location.state;

  return (
    <div className="registerPage">
      <div className="register_page">
        <div className="reg_title">
          <h3>Registration Details</h3>
        </div>
        <div className="register_form_container">
          {!checkOut && < div className="register_form">
            <RegisterForm
              title={eventName}
              amountAdult={amountAdult}
              amountChild={amountChild}
              adultCount={adultCount}
              setAdultCount={setAdultCount}
              childCount={childCount}
              setChildCount={setChildCount}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
            />
          </div>}
          <div className="cart">
            <Cart
              title={eventName}
              amountAdult={amountAdult}
              amountChild={amountChild}
              adultCount={adultCount}
              childCount={childCount}
            />
          </div>

        </div>
        {
          checkOut && <div className="register_title">
            <h1>Checkout</h1>
            <span>How would you like to pay?</span>
            <div className="pay_methods">
              <button
                className={activeButton === 1 ? "active" : ""}
                onClick={() => { handleActive(1); setPaymentMethod(1); }}
              >
                Card
              </button>
              <button
                className={activeButton === 2 ? "active" : ""}
                onClick={() => { handleActive(2); setPaymentMethod(2) }}
              >
                PayPal
              </button>
            </div>
          </div>
        }
        {
          paymentMethod === 1 &&
          <div className="paymentSection">
            <div className="paymentSection1">
              <Payment />
            </div>
          </div>
        }
      </div >
    </div >
  );
}

export default RegisterPage;
