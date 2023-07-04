import React, { useState } from "react";
import "./RegisterForm.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function RegisterForm({ title, adultCount, setAdultCount, childCount, setChildCount, paymentMethod }) {

  const phoneRegExp = /^\+\d{1,4}\d{10}$/;

  const [paymentMethodError, setPaymentMethodError] = useState(null);


  const schema = yup.object().shape({
    firstName: yup.string().required("Your First Name is Required!"),
    lastName: yup.string().required("Your Last Name is Required!"),
    country: yup.string().required("Please enter the country!"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid!"),
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


  const onSubmit = (data) => {

    setPaymentMethodError("");
    if (paymentMethod === 0) {
      setPaymentMethodError("Please select a payment method to proceed")
      return
    }

    console.log(data);
  };


  return (
    <div className="form_container">
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
            <input type="tel" {...register("phone")} />
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
        <div className="ticket_count">
          <label>Number of tickets</label>
          <div className="counter-container">
            <div className="counter">
              <span>Adults</span>
              <button
                type="button"
                onClick={() => setAdultCount(adultCount - 1)}
                disabled={adultCount === 0}
              >
                -
              </button>
              <span>{adultCount}</span>
              <button type="button" onClick={() => setAdultCount(adultCount + 1)}>
                +
              </button>
            </div>
            <div className="counter">
              Children
              <button
                type="button"
                onClick={() => setChildCount(childCount - 1)}
                disabled={childCount === 0}
              >
                -
              </button>
              <span>{childCount}</span>
              <button type="button" onClick={() => setChildCount(childCount + 1)}>
                +
              </button>
            </div>
          </div>
        </div>
        {paymentMethodError !== "" &&
          <div className="custom_error">
            <span>{paymentMethodError}</span>
          </div>
        }

        <div className="form_submit">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
