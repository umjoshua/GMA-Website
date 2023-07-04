import React from "react";
import "./MemRegistrationPage.css";

function MemRegistrationPage() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello")
  }

  return (
    <div className="membership_container">
      <div className="membership_form">
        <h1>Membership Form </h1>
        <form onSubmit={handleSubmit}>
          <span className="mandatory">* indicates mandatory fields</span>
          {/* Applicant Information */}
          <h3>Applicant Information <span className="mandatory">*</span></h3>
          <div className="applicantInfo">
            <input className="formInput"
              placeholder="First Name"
            />
            <input className="formInput"
              placeholder="Middle Name"
            />
            <input className="formInput"
              placeholder="Last Name"
            />
          </div>
          {/* Address */}
          <h3>Address <span className="mandatory">*</span></h3>
          <div className="address">
            <div className="address1">
              <input className="formInput"
                placeholder="Street Address"
              />
              <input className="formInput"
                placeholder="Street Address 2"
              />
            </div>
            <div className="address2">
              <input className="formInput"
                placeholder="Suburb"
              />
              <input className="formInput"
                placeholder="State"
              />
            </div>
            <div className="address2">
              <input className="formInput"
                placeholder="Post Code"
              />
              <input className="formInput"
                placeholder="Country"
              />
            </div>
          </div>
          {/* Phone Number */}
          <h3>Phone Number <span className="mandatory">*</span></h3>
          <div className="phone">
            <input className="formInput"
              placeholder="Area Code"
            />
            <input className="formInput"
              placeholder="Phone Number"
            />
          </div>
          {/* Email */}
          <h3>Email <span className="mandatory">*</span></h3>
          <div className="email">
            <input className="formInput"
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
                  type="radio"
                  required
                />
                Male
              </label>
              <label>
                <input className="radioInput"
                  type="radio"
                  required
                />
                Female
              </label>
            </div>
          </div>
          {/* Age */}
          <h3>Age <span className="mandatory">*</span></h3>
          <div className="email">
            <input className="formInput"
              placeholder="Age"
              required
            />
          </div>
          {/* Blood Group */}
          <h3>Blood Group</h3>
          <div className="email">
            <select className="formInput">
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
                placeholder="First Name"
                required
              />
              <input className="formInput"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="address1">
              <input className="formInput"
                placeholder="10 digit phone number excluding country code"
                required
              />
            </div>
          </div>
          {/* Spouce Details */}
          <h3>Name of Spouce</h3>
          <div className="applicantInfo">
            <input className="formInput"
              placeholder="First Name"
            />
            <input className="formInput"
              placeholder="Middle Name"
            />
            <input className="formInput"
              placeholder="Last Name"
            />
          </div>
          <div className="address1">
            <input className="formInput"
              placeholder="Spouce Phone Number"
            />
          </div>
          <div className="address1">
            <input className="formInput"
              type="email"
              placeholder="Spouce Email"
            />
          </div>
          {/* Other family member details */}
          <h3>Details of other family members in your household and kids under 13 years</h3>
          <span style={{ fontSize: "small", color: "gray" }}>Please enter Full Name, Gender and Age</span>
          <div className="address1">
            <textarea className="familyDetails" rows={5} cols={50}></textarea>
          </div>
          {/* Preferred Method of contact */}
          <h3>Preferred Method of contact</h3>
          <div className="contactMethod">
            <div className="gender">
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="email"
                />
                Email
              </label>
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="email"
                />
                Text Message
              </label>
            </div>
            <div className="gender">
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="email"
                />
                Whatsapp
              </label>
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="email"
                />
                Facebook
              </label>
            </div>
          </div>
          {/* Membership Type */}
          <h3>Type of membership</h3>
          <div className="contactMethod">
            <div className="gender">
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="full"
                />
                Full membership
              </label>
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="associate"
                />
                Associate membership
              </label>
            </div>
          </div>
          {/* Membership Fee */}
          <h3>Membership fee paid?</h3>
          <span className="accountDetails">
            BSB: 063871 A/C No: 1034 5666 A/C Name: Geelong Malayalee Association Inc.
          </span>
          <div className="contactMethod">
            <div className="gender">
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="full"
                />
                Yes
              </label>
              <label>
                <input
                  className="radioInput"
                  type="checkbox"
                  value="associate"
                />
                No
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <button className="submitButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemRegistrationPage;
