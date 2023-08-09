import React, { useState } from "react";
import "./MemRegistrationPage.css";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from "react-router-dom";

import * as api from '../../api';

function MemRegistrationPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [thank, setThank] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    address1: "",
    address2: "",
    suburb: "",
    state: "",
    postCode: "",
    country: "",
    phNo: "",
    email: "",
    gender: "Male",
    age: "",
    bloodGroup: "",
    keralaContactfname: "",
    keralaContactlname: "",
    keralaContactphNo: "",
    spouceFname: "",
    spouceMname: "",
    spouceLname: "",
    spoucePhNo: "",
    spouceEmail: "",
    familyDetails: "",
    contactMethod: "Email",
    membershipType: "Associate",
    membershipFeePaid: "No",
  })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    setError("");
    event.preventDefault();
    setLoading(true);
    await api.membershipRegister(formData).then((res) => {
      setThank(true);
    }).catch((error) => {
      setError("Couldn't Register");
    });
    setLoading(false);
  }

  return (
    <div className={!thank ? "membership_container" : ""}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!thank && <div className="membership_form">
        <h1>Membership Form </h1>
        <form onSubmit={handleSubmit}>
          <span className="mandatory">* indicates mandatory fields</span>

          {/* Applicant Information */}
          <h3>Applicant Information <span className="mandatory">*</span></h3>
          <div className="applicantInfo">
            <input className="formInput"
              value={formData.fname}
              name="fname"
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input className="formInput"
              value={formData.mname}
              name="mname"
              onChange={handleChange}
              placeholder="Middle Name"
            />
            <input className="formInput"
              value={formData.lname}
              name="lname"
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>

          {/* Address */}
          <h3>Address <span className="mandatory">*</span></h3>
          <div className="address">
            <div className="address1">
              <input className="formInput"
                value={formData.address1}
                name="address1"
                onChange={handleChange}
                placeholder="Street Address"
                required
              />
              <input className="formInput"
                value={formData.address2}
                name="address2"
                onChange={handleChange}
                placeholder="Street Address 2"
              />
            </div>
            <div className="address2">
              <input className="formInput"
                value={formData.suburb}
                name="suburb"
                onChange={handleChange}
                placeholder="Suburb"
              />
              <input className="formInput"
                value={formData.state}
                name="state"
                onChange={handleChange}
                placeholder="State"
              />
            </div>
            <div className="address2">
              <input className="formInput"
                value={formData.postCode}
                name="postCode"
                onChange={handleChange}
                placeholder="Post Code"
              />
              <input className="formInput"
                value={formData.country}
                name="country"
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
          </div>

          {/* Phone Number */}
          <h3>Phone Number <span className="mandatory">*</span></h3>
          <div className="phone">
            <input className="formInput"
              value={formData.phNo}
              name="phNo"
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>

          {/* Email */}
          <h3>Email <span className="mandatory">*</span></h3>
          <div className="email">
            <input className="formInput"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
              type="email"
              required
            />
          </div>

          {/* Gender */}
          <h3>Gender <span className="mandatory">*</span></h3>
          <div className="contactMethod">
            <div className="gender">
              <label>
                <input className="radioInput"
                  value="Male"
                  name="gender"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  type="radio"
                />
                Male
              </label>
              <label>
                <input className="radioInput"
                  type="radio"
                  value="Female"
                  name="gender"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Age */}
          <h3>Age <span className="mandatory">*</span></h3>
          <div className="email">
            <input className="formInput"
              value={formData.age}
              name="age"
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>

          {/* Blood Group */}
          <h3>Blood Group<span className="mandatory"> *</span></h3>
          <div className="email">
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="formInput"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Emergency contact details */}
          <h3>Emergency Contact Details in Kerala / India <span className="mandatory">*</span></h3>
          <div className="email">
            <div className="address2">
              <input className="formInput"
                name="keralaContactfname"
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              <input className="formInput"
                name="keralaContactlname"
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="address1">
              <input className="formInput"
                name="keralaContactphNo"
                onChange={handleChange}
                placeholder="10 digit phone number excluding country code"
                required
              />
            </div>
          </div>

          {/* Spouce Details */}
          <h3>Name of Spouce</h3>
          <div className="applicantInfo">
            <input className="formInput"
              name="spouceFname"
              onChange={handleChange}
              placeholder="First Name"
            />
            <input className="formInput"
              name="spouceMname"
              onChange={handleChange}
              placeholder="Middle Name"
            />
            <input className="formInput"
              name="spouceLname"
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <div className="address1">
            <input className="formInput"
              name="spoucePhNo"
              onChange={handleChange}
              placeholder="Spouce Phone Number"
            />
          </div>
          <div className="address1">
            <input className="formInput"
              name="spouceEmail"
              onChange={handleChange}
              type="email"
              placeholder="Spouce Email"
            />
          </div>

          {/* Other family member details */}
          <h3>Details of Children</h3>
          <span style={{ fontSize: "small", color: "gray" }}>Please enter Full Name, Gender and Age</span>
          <div className="address1">
            <textarea className="familyDetails" rows={5} cols={50}
              name="familyDetails"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Preferred Method of contact */}
          <h3>Preferred Method of contact <span className="mandatory">*</span> </h3>
          <div className="contactMethod">
            <div className="gender">
              <label>
                <input
                  className="radioInput"
                  name="contactMethod"
                  checked={formData.contactMethod === "Email"}
                  onChange={handleChange}
                  type="checkbox"
                  value="Email"
                />
                Email
              </label>
              <label>
                <input
                  className="radioInput"
                  name="contactMethod"
                  checked={formData.contactMethod === "Text"}
                  onChange={handleChange}
                  type="checkbox"
                  value="Text"
                />
                Text Message
              </label>
            </div>
            <div className="gender">
              <label>
                <input
                  className="radioInput"
                  name="contactMethod"
                  checked={formData.contactMethod === "Whatsapp"}
                  onChange={handleChange}
                  type="checkbox"
                  value="Whatsapp"
                />
                Whatsapp
              </label>
              <label>
                <input
                  className="radioInput"
                  name="contactMethod"
                  checked={formData.contactMethod === "Facebook"}
                  onChange={handleChange}
                  type="checkbox"
                  value="Facebook"
                />
                Facebook
              </label>
            </div>
          </div>

          {/* Membership Type */}
          <h3>Type of membership<span className="mandatory"> *</span></h3>
          <div className="contactMethod">
            <div className="gender">
              <label>
                <input
                  name="membershipType"
                  checked={formData.membershipType === "Full"}
                  className="radioInput"
                  type="checkbox"
                  onChange={handleChange}
                  value="Full"
                />
                Full membership
              </label>
              <label>
                <input
                  className="radioInput"
                  name="membershipType"
                  checked={formData.membershipType === "Associate"}
                  type="checkbox"
                  onChange={handleChange}
                  value="Associate"
                />
                Associate membership
              </label>
            </div>
          </div>

          {/* Membership Fee */}
          <h3 style={{ marginBottom: "5px" }}>Membership fee paid?<span className="mandatory"> *</span></h3>
          <span className="accountDetails">
            BSB: 063871 A/C No: 1034 5666 A/C Name: Geelong Malayalee Association Inc.
          </span>
          <div className="contactMethod">
            <div className="gender">
              <label >
                <input
                  className="radioInput"
                  name="membershipFeePaid"
                  checked={formData.membershipFeePaid === "Yes"}
                  onChange={handleChange}
                  type="checkbox"
                  value="Yes"
                />
                Yes
              </label>
              <label>
                <input
                  className="radioInput"
                  name="membershipFeePaid"
                  checked={formData.membershipFeePaid === "No"}
                  onChange={handleChange}
                  type="checkbox"
                  value="No"
                />
                No
              </label>
            </div>
          </div>

          {/* Agreement */}
          <div className="policyDetails">
            <span>
              By ticking this box I agree that I have read, understood and abide the rules of Geelong Malayalee Association (GMA).
              I also agree to be a member of Geelong Malayalee Association (GMA) and my details can be entered in the membership register.
              I am aware that these details can be used to send membership fee notices and other communications including information about meeting and events organized or supported by Geelong Malayalee Association (GMA).
              Geelong Malayalee Association (GMA) and it's office bearers respects your privacy seriously and are aware that it is an offence to make improper use of information about a person obtained from the Register of
              Members as per Section 58 of the Associations Incorporation Reform act 2012.
            </span>
          </div>
          <div className="contactMethod">
            <div className="policyDetails1">
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="radioInput"
                  type="checkbox"
                  required
                />
                I have read, understood, and accepted the rules of membership.
              </label>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="radioInput"
                  type="checkbox"
                  required
                />
                I confirm that all the above information are correct and true to best of my knowledge and belief.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button className="submitButton">
            Submit
          </button>
          <div className="status">{error}</div>
        </form>
      </div>}
      {
        thank &&
        <div className="thankContainer" style={{ backgroundColor: 'white', borderRadius: "10px" }}>
          <h1 style={{ color: "black", textAlign: 'center' }}>Thankyou for registering!</h1>
          <span style={{ fontSize: "large", padding: "10px" }}>We have received your application and will be in contact with you shortly.</span>
          <button onClick={() => navigate('/')}>Go Home</button>
        </div>
      }
    </div>
  );
}

export default MemRegistrationPage;
