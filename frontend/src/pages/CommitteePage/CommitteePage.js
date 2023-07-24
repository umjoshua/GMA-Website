import React, { useEffect, useState } from "react";
import Committee from "../../components/Committee/Committee";
import "./CommitteePage.css";
import * as api from '../../api'
import { fetchEventSource } from "@microsoft/fetch-event-source";

function CommitteePage() {
  const [committee, setCommittee] = useState([])

  const baseURL = api.baseURL;

  useEffect(() => {
    const fetchData = async () => {
      let updatedCommittee = committee;
      try {
        await fetchEventSource(baseURL + '/user/committee', {
          method: 'GET',
          headers: {
            Accept: "text/event-stream",
          },
          onmessage(event) {
            const parsedData = JSON.parse(event?.data)

            for (let i = 0; i < parsedData.length; i++) {
              updatedCommittee = [...updatedCommittee, parsedData[i]];
            }

            setCommittee(() => { return updatedCommittee })
            console.log('*')
          }
        })
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      {
        committee.length !== 0 &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="committe_cards">
            {
              committee.find(obj => obj.position === "President") && <Committee item={committee.find(obj => obj.position === "President")} />
            }
            {
              committee.find(obj => obj.position === "Secretary") && <Committee item={committee.find(obj => obj.position === "Secretary")} />
            }
            {
              committee.find(obj => obj.position === "Treasurer") && <Committee item={committee.find(obj => obj.position === "Treasurer")} />
            }
          </div>
          <div className="committe_cards">
            {
              committee.find(obj => obj.position === "Vice President") && <Committee item={committee.find(obj => obj.position === "Vice President")} />
            }
            {
              committee.find(obj => obj.position === "Joint Secretary") && <Committee item={committee.find(obj => obj.position === "Joint Secretary")} />
            }
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