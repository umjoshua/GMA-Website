import React from "react";
import "./RegisterForm.css";
import CloseIcon from "@mui/icons-material/Close";

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

  return (
    <div className="register_form_background">
      <div className="register_form">
        <div className="register_title">
          <div className="reg_title">
            <span>Register for the Event</span>
          </div>

          <div className="close_btn">
            <button onClick={() => props.popupOpen(false)}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="register_form_inputs">
          <form className="form">
            <label>Full Name *</label>
            <input placeholder="Full Name" type="text" />
            <label>Email *</label>
            <input placeholder="johndoe@gmail.com" type="email" />
            <label>Address *</label>
            <input placeholder="3248 Burning Memory Lane" type="text" />
            <label htmlFor="state">State/Province *</label>
            <select id="state" placeholder="State">
              <option value="" disabled selected>
                Select a state
              </option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <label>Zip Code *</label>
            <input placeholder="19145" type="text" />
            <label>Phone Number *</label>
            <input placeholder="+1 806-674-1431" type="tel" />
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
