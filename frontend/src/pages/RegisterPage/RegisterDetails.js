import React, { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterDetails.css";
import Cart from "../../components/Cart/Cart";
import Payment from "../../components/Payment/Payment";
import PayPalPayment from "../../components/Payment/PayPal";
import EventThank from "../../components/EventThank/EventThank";

function RegisterDetails({ event, registrationData, setBackPage }) {
  const [activeButton, setActiveButton] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [checkOut, setCheckOut] = useState(false)
  const [thank, setThank] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState("");

  const handleActive = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <>
      {thank &&
        <div className="tq1">
          <EventThank error={error} />
        </div>}
      {!thank && <div className="registerPage">
        <div className="cart">
          {!thank && <Cart event={event} registrationData={registrationData} />}
        </div>
        <div className="register_page">
          {!thank && <> <div className="reg_title">
            {!checkOut && <h3>Registration Details</h3>}
          </div>
            <div className="register_form_container">
              {!checkOut && < div className="register_form">
                <RegisterForm
                  event={event}
                  setCheckOut={setCheckOut}
                  setBackPage={setBackPage}
                  registrationData={registrationData}
                  setData={setData}
                  setThank={setThank}
                  setError={setError}
                />
              </div>}

            </div>
            {
              checkOut && !thank && <div className="register_title">
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
                  <Payment setThank={setThank} data={data} setError={setError} />
                </div>
              </div>
            }
            {
              paymentMethod === 2 &&
              <div className="paymentSection">
                <div className="paymentSection1">
                  <PayPalPayment setThank={setThank} regData={data} setError={setError} />
                </div>
              </div>
            }
          </>
          }
        </div >
      </div >
      }
    </>
  );
}

export default RegisterDetails;
