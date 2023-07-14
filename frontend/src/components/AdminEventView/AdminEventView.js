import React, { useState, useEffect } from 'react';
import './AdminEventView.css';
import CloseIcon from '@mui/icons-material/Close';

function AdminEventView({ events, setViewEvent, currentId, setcurrentId }) {

  const [event, setEvent] = useState({});


  const viewEvent = currentId ? events.find((event) => event._id === currentId) : null

  useEffect(() => {
    if (viewEvent) setEvent(viewEvent);
  }, [viewEvent]);


  return (
    <div className='form-container'>
      <div className='form-header'>
        <h2>{event.title}</h2>
        <CloseIcon style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '50px', padding: '5px' }}
          onClick={() => setViewEvent(false)}
        />
      </div>
      <div className='form-content'>
        <div className='form-input'>
          <span>Description:</span>
          <span style={{ fontWeight: 'normal' }}>{event.description}</span>
        </div>
        <div className='form-input'>
          <span>Event Date:</span>
          <span style={{ fontWeight: 'normal' }}>{event.event_date}</span>
        </div>
        <div className='form-input'>
          <span>Event Time:</span>
          <span style={{ fontWeight: 'normal' }}>{event.event_time}</span>
        </div>
        <div className='form-input'>
          <span>Event Location:</span>
          <span style={{ fontWeight: 'normal' }}>{event.event_location}</span>
        </div>
        <div className='form-input'>
          <span>State:</span>
          <span style={{ fontWeight: 'normal' }}>{event.state}</span>
        </div>
        <div className='form-input'>
          <span>Country:</span>
          <span style={{ fontWeight: 'normal' }}>{event.country}</span>
        </div>
        <div className='form-input'>
          <div className='display-tickets'>
            <span>Tickets</span>
            {event?.tickets?.length >= 1 && event.tickets.map((ticket, index) => {
              return (
                <div key={index} className='form-1'>
                  <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                      <span>Name:</span>
                      <span style={{ fontWeight: 'normal' }}>{ticket.name}</span>
                    </div>
                  </div>
                  <div>
                    <span>Description:</span>
                    <span style={{ fontWeight: 'normal' }}>{ticket.description}</span>
                  </div>
                  <span>Pricing: </span>
                  {
                    event.tickets[index].pricing.map((pricing, ind) => {
                      return (
                        <div key={ind}>
                          <div style={{ display: "flex" }}>
                            <span>{pricing.name}: </span>
                            <span style={{ fontWeight: 'normal' }}>{pricing.price}</span>
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              )
            })}
          </div>
          <div className='form-input'>
            <span>Terms and Conditions:</span>
            <span style={{ fontWeight: 'normal',whiteSpace:'pre-wrap' }}>{event.terms}</span>
          </div>
        </div>
        <div className='form-input'>
          <span>Registration Needed?</span>
          <span style={{ fontWeight: 'normal' }}>{event.regOpen}</span>
        </div>
        <div className='form-input'>
          <span>Poster:</span>
          <img src={event.file} style={{ maxWidth: "300px" }} alt='Poster'></img>
        </div>
      </div>
    </div >
  );
}
export default AdminEventView;