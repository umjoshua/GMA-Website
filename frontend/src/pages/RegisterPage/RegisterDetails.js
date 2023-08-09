import React, { useState, useEffect } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterDetails.css";
import Cart from "../../components/Cart/Cart";
import PayPalPayment from "../../components/Payment/PayPal";
import EventThank from "../../components/EventThank/EventThank";
import { FUNDING_SOURCES } from "../../components/Payment/PayPal";

function RegisterDetails({ event, registrationData, setBackPage }) {

  const [checkOut, setCheckOut] = useState(false)
  const [thank, setThank] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState("");
  const [fundingSource, setFundingsource] = useState(FUNDING_SOURCES[1]);
  const [pfee, setPfee] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (fundingSource === "paypal") {
      setPfee((registrationData?.subTotal * 3) / 100);
      setTotal(registrationData?.subTotal + pfee + 0.50)
    } else {
      setPfee((registrationData?.subTotal * 2) / 100);
      setTotal(registrationData?.subTotal + pfee + 0.50)
    }
  }, [fundingSource, registrationData, pfee, total]);



  return (
    <>
      {thank &&
        <div className="tq1">
          <EventThank error={error} />
        </div>}
      {!thank && <div className="registerPage" style={checkOut ? { display: 'flex', flexDirection: 'column' } : {}}>
        <div className="cart">
          {!thank && <Cart event={event} registrationData={registrationData} pfee={pfee} total={total} />}
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
                  fundingSource={fundingSource}
                  setFundingsource={setFundingsource}
                />
              </div>}

            </div>
            {
              checkOut && !thank && <div className="register_title">
                <span>Pay with {fundingSource === "paypal" ? "PayPal" : "Card"}</span>
                <div className="pay_methods">
                  <PayPalPayment setThank={setThank} regData={data} setError={setError} fundingSource={fundingSource} total={total}/>
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
