import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import './RegisterPage.css'

function RegisterPage() {

  const { id } = useParams();
  const events = useContext(AppContext);

  const event = events.find((event) => event._id === id);

  const [page, setPage] = useState(0);
  const [ticketType, setTicketType] = useState(null);

  const findMinAmount = (pricing) => {
    return Math.min(...pricing.map(item => item.price));
  }

  const findMaxAmount = (pricing) => {
    return Math.max(...pricing.map(item => item.price));
  }

  return (
    <>
      {
        event && event.tickets.length >= 1 &&
        <div className="rg1-1">
          <div className="rg1-2">
            <span>{event.title}</span>
          </div>
          {page === 0 &&
            <div className="rg1-5">
              <div id="rg1-3">
                <span>Select an option</span>
              </div>
              {
                event.tickets.length >= 1 && event?.tickets.map((ticket, index) => {
                  return (
                    <div className="rg1-4" key={index}>
                      <div className="rg1-4-div">
                        <span id="rg1-4-1">{ticket.name}</span>
                      </div>
                      <div className="rg1-4-div">
                        <span id="rg1-4-2">{ticket.description}</span>
                      </div>
                      <div className="rg1-4-div">
                        <span id="rg1-4-2">{findMinAmount(ticket.pricing)}$ - {findMaxAmount(ticket.pricing)}$</span>
                      </div>
                      <button id="rg-4-3" onClick={() => {
                        setTicketType(index);
                        setPage(1);
                      }}>Select</button>
                    </div>
                  )
                })
              }
            </div >
          }

          {
            ticketType && page === 1 &&
            <div className="rg1-5">
              <div id="rg1-3">
                <span>Select Tickets</span>
              </div>
              Hello
            </div >
          }
        </div>
      }
    </>
  );
}

export default RegisterPage;