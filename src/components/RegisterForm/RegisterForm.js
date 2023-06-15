import React from "react";
import "./RegisterForm.css";
import CloseIcon from "@mui/icons-material/Close";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function RegisterForm(props) {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "MaryLand",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Missippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is Required!"),
    email: yup.string().email().required("Please provide your email!"),
    address: yup.string().required("Please provide your Address"),
    state: yup.string().required("State Required"),
    zipcode: yup.number().required("Please provide your Zipcode"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="register_form_background">
      <div className="register_form">
        <div className="register_title">
          <div className="reg_title">
            <span>Register for {props.title}</span>
          </div>

          <div className="close_btn">
            <button onClick={() => props.popupOpen(false)}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="register_form_inputs">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label>Full Name *</label>
            <input
              placeholder="Full Name"
              type="text"
              {...register("fullName")}
            />
            <span>{errors.fullName?.message}</span>
            <label>Email *</label>
            <input
              placeholder="johndoe@gmail.com"
              type="email"
              {...register("email")}
            />
            <span>{errors.email?.message}</span>
            <label>Address *</label>
            <input
              placeholder="3248 Burning Memory Lane"
              type="text"
              {...register("address")}
            />
            <span>{errors.address?.message}</span>
            <label htmlFor="state">State/Province *</label>
            <select id="state" placeholder="State" {...register("state")}>
              <option value="" disabled selected>
                Select a state
              </option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <span>{errors.state?.message}</span>
            <label>Zip Code *</label>
            <input placeholder="19145" type="text" {...register("zipcode")} />
            <span>{errors.zipcode?.message}</span>
            <label>Phone Number *</label>
            <input
              placeholder="+1 806-674-1431"
              type="tel"
              {...register("phone")}
            />
            <span>{errors.phone?.message}</span>
            <div className="register_submit">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
