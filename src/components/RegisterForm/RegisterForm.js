import React from "react";
import "./RegisterForm.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function RegisterForm({ title, amount }) {
  
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    firstName: yup.string().required("Your First Name is Required!"),
    lastName: yup.string().required("Your Last Name is Required!"),
    country: yup.string().required("Please enter the country!"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid!"),
    address: yup.string().required("Please provide your Address"),
    suburb: yup.string().required("SUBURB Required"),
    postcode: yup.string().required("Please provide your Zipcode"),
    email: yup.string().email().required("Please provide your email!"),
    cEmail: yup.string().email().required("Please provide your email!"),
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
    console.log(title,amount);
  };
  return (
    <div className="form_container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form_part_one">
          <div className="form_name">
            <label>FIRST NAME</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            <span>{errors.fisrtName?.message}</span>
          </div>
          <div className="form_name">
            <label>LAST NAME</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <span>{errors.lastName?.message}</span>
          </div>

          <div className="form_name">
            <label>COUNTRY</label>
            <input type="text" placeholder="Country" {...register("country")} />
            <span>{errors.country?.message}</span>
          </div>
          <div className="form_name">
            <label>PHONE NUMBER</label>
            <input type="tel" {...register("phone")} />
            <span>{errors.phone?.message}</span>
          </div>
        </div>

        <div className="form_address">
          <label>ADDRESS</label>
          <input type="text" placeholder="Address" {...register("address")} />
          <span>{errors.address?.message}</span>
        </div>

        <div className="form_part_one">
          <div className="form_name">
            <label>SUBURB</label>
            <input type="text" placeholder="SUBURB" {...register("suburb")} />
            <span>{errors.suburb?.message}</span>
          </div>
          <div className="form_name">
            <label>POSTCODE</label>
            <input
              type="text"
              placeholder="POSTCODE"
              {...register("postcode")}
            />
            <span>{errors.postcode?.message}</span>
          </div>
          <div className="form_name">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              {...register("email")}
            />
            <span>{errors.email?.message}</span>
          </div>
          <div className="form_name">
            <label>CONFIRM EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              {...register("cEmail")}
            />
            <span>{errors.cEmail?.message}</span>
          </div>
        </div>
        <div className="form_submit">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
