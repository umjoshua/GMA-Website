import React from "react";
import Committee from "../../components/Committee/Committee";
import "./CommitteePage.css";
import CommitteeData from "../../data/CommitteeData/CommitteeData";

function CommitteePage() {
  return (
    <div>
      <div className="committee_title">
        <h1>Our Team</h1>
      </div>
      <div className="committe_cards">
        {CommitteeData.map((item, key) => {
          return <Committee item={item} key={key} />;
        })}
      </div>
    </div>
  );
}

export default CommitteePage;