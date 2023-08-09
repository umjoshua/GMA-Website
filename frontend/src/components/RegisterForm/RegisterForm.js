import React, { useState } from "react";
import "./RegisterForm.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as api from '../../api'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TermsPopup from './TermsPopup';
import CreditCardIcon from '@mui/icons-material/CreditCard';

function RegisterForm({ event, setCheckOut, setBackPage, registrationData, setData, setThank, setError, fundingSource, setFundingsource }) {

  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [warning, setWarning] = useState("");

  const schema = yup.object().shape({
    firstName: yup.string().required("Your First Name is Required!"),
    lastName: yup.string().required("Your Last Name is Required!"),
    country: yup.string().required("Please enter the country!"),
    phone: yup.string().required("Phone number is not valid!"),
    address: yup.string().required("Please provide your Address!"),
    suburb: yup.string().required("Suburb Required!"),
    postcode: yup.string().required("Please provide your Zipcode!"),
    email: yup.string().email().required("Please provide your email!"),
    cEmail: yup.string().email().oneOf([yup.ref('email'), null], "Email doesn't match")
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!terms) {
      setWarning("Please agree terms and conditions to proceed.");
      return;
    }
    setLoading(true);
    const newData = {
      ...data,
      event_id: registrationData.event_id,
      ticketType: registrationData.ticketType,
      ticketCount: registrationData.ticketCount,
      subTotal: registrationData.subTotal,
    }
    setData(newData)
    if (newData.subTotal === 0) {
      await api.registerForEvent(newData).then((res) => {
        setThank(true);
      }).catch((error) => {
        setError(true);
      });
      setLoading(false);
    }
    else {
      setCheckOut(true);
    }
  };


  return (
    <div className="form_container">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form_part_one">
          <div className="form_name">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            <span>{errors.fisrtName?.message}</span>
          </div>
          <div className="form_name">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <span>{errors.lastName?.message}</span>
          </div>

          <div className="form_name">
            <label>Country</label>
            <input type="text" placeholder="Country" {...register("country")} />
            <span>{errors.country?.message}</span>
          </div>
          <div className="form_name">
            <label>Phone Number</label>
            <input type="tel" {...register("phone")} placeholder="+611234567890" required />
            <span>{errors.phone?.message}</span>
          </div>
        </div>

        <div className="form_address">
          <label>Address</label>
          <input type="text" placeholder="Address" {...register("address")} />
          <span>{errors.address?.message}</span>
        </div>

        <div className="form_part_one">
          <div className="form_name">
            <label>Suburb</label>
            <input type="text" placeholder="SUBURB" {...register("suburb")} />
            <span>{errors.suburb?.message}</span>
          </div>
          <div className="form_name">
            <label>Postcode</label>
            <input
              type="text"
              placeholder="POSTCODE"
              {...register("postcode")}
            />
            <span>{errors.postcode?.message}</span>
          </div>
          <div className="form_name">
            <label>Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              {...register("email")}
            />
            <span>{errors.email?.message}</span>
          </div>
          <div className="form_name">
            <label>Confirm Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              {...register("cEmail")}
            />
            <span>{errors.cEmail?.message}</span>
          </div>
        </div>

        {registrationData.subTotal !== 0 && <>
          <span style={{ fontWeight: 'bold', fontSize: 'large', color: 'purple', marginLeft: "15px" }}>
            How would you like to pay?
          </span>

          <div style={
            {
              marginLeft: '15px',
              display: 'flex',
              marginTop: '10px',
              justifyContent: 'space-evenly'
            }
          }>

            <button className={fundingSource === 'card' ? "selected_pay_button" : "pay_button"}
              onClick={(e) => { e.preventDefault(); setFundingsource('card'); }}
            >
              <span
                style={{
                  fontWeight: 'bold', fontStyle: 'italic',

                  color: fundingSource === 'card' ? 'white' : '#253b80',
                  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                }}><CreditCardIcon style={{ height: '10px' }} />Card</span>
            </button>


            <button className={fundingSource === 'paypal' ? "selected_pay_button" : "pay_button"}
              onClick={(e) => { e.preventDefault(); setFundingsource('paypal') }}
            >

              <span style={{
                fontWeight: 'bold', fontStyle: 'italic', color: fundingSource === 'paypal' ? 'white' : '#253b80'
              }}>Pay</span>
              <span style={{
                fontWeight: 'bold', fontStyle: 'italic',
                color: fundingSource === 'paypal' ? 'white' : '#179bd7'
              }}>Pal</span>
            </button>
          </div></>
        }
        <label className="terms-c">
          <input className="radioInput"
            type="radio"
            required
            checked={terms}
            onClick={() => setTerms(!terms)}
            onChange={() => { }}
          />
          I agree to {<TermsPopup terms={event.terms} />}
        </label>
        <p style={{ color: 'red', marginLeft: "10px" }}>{warning}</p>
        <div className="form_submit">
          <div onClick={() => setBackPage(registrationData.ticketIndex)}>
            Back
          </div>
          <input type="submit"
            value={registrationData.subTotal !== 0 ? "Submit and Pay" : "Submit"}
          />
        </div>
      </form >
    </div >
  );
}

export default RegisterForm;
