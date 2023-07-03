import React from "react";
import "./MemRegistrationPage.css";
import MembershipForm from "../../components/MembershipForm/MembershipForm";

function MemRegistrationPage() {
  return (
    <div className="membership_container">
      <div className="member">
        <MembershipForm />
      </div>
    </div>
  );
}

export default MemRegistrationPage;
