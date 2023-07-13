import React, { useEffect, useState } from "react";
import Committee from "../../components/Committee/Committee";
import "./CommitteePage.css";
import * as api from '../../api'

function CommitteePage() {
  const [committee, setCommittee] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.fetchCommittee();
      setCommittee(response.data);
    };
    fetchData();
  }, [])
  return (
    <>
      {
        committee.length !== 0 &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="committe_cards">
            <Committee item={committee.find(obj => obj.position === "President")}></Committee>
            <Committee item={committee.find(obj => obj.position === "Secretary")}></Committee>
            <Committee item={committee.find(obj => obj.position === "Treasurer")}></Committee>
          </div>
          <div className="committe_cards">
            <Committee item={committee.find(obj => obj.position === "Vice President")}></Committee>
            <Committee item={committee.find(obj => obj.position === "Joint Secretary")}></Committee>
          </div>
          <div className="committee_title">
            <span>Executive Committee Members</span>
          </div>
          <div className="committe_cards">
            {committee.map((item, key) => {
              return item.position === "Executive Member" && <Committee item={item} key={key} />
            })}
          </div>
        </div>
      }
    </>
  );
}

export default CommitteePage;