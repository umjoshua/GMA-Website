import React, { useState, useEffect } from 'react';
import * as api from '../../../api'
import './AdminEventForm.css';
import AddEventPopup from './AddEventPopup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileBase from 'react-file-base64';
import CloseIcon from '@mui/icons-material/Close';

function AdminEventForm({ events, setEvents, setAddEvent, currentId, setcurrentId }) {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  };

  const [ticketCount, setTicketCount] = useState(0);

  const [event, setEvent] = useState(
    {
      title: '',
      description: '',
      event_time: '',
      event_date: '',
      event_location: '',
      state: '',
      country: '',
      tickets: [],
      terms: '',
      file: '',
      regOpen: 'Yes'
    });

  const handleDeleteTicket = (index) => {
    const updatedTickets = [...event.tickets];
    updatedTickets.splice(index, 1);
    setEvent({ ...event, tickets: updatedTickets });
    setTicketCount(ticketCount - 1);
  };


  const editEvent = currentId ? events.find((event) => event._id === currentId) : null

  useEffect(() => {
    if (editEvent) {
      setEvent(editEvent)
      setTicketCount(editEvent?.tickets.length)
    };
  }, [editEvent]);

  const postdata = async () => {
    if (currentId) {
      const { data } = await api.editEvent(currentId, event, config);
      if (data) {
        console.log(data)
      }
    } else {
      const { data } = await api.addEvent(event, config);
      if (data) {
        console.log(data);
      }
    }
    const response = await api.fetchEvents();
    setEvents(response?.data);
  };

  const handleSubmit = (e) => {
    console.log(event);
    e.preventDefault();
    console.log(JSON.stringify(event));
    postdata();
    clearSubmit();
  };

  const clearSubmit = () => {
    setEvent({
      title: '',
      description: '',
      event_time: '',
      event_date: '',
      event_location: '',
      state: '',
      country: '',
      eventImage: '',
      regOpen: 'Yes',
    });
    setcurrentId(null);
    setAddEvent(false);
  }

  return (
    <div className='form-container'>
      <div className='form-header'>
        <h2>{currentId ? 'Edit' : 'Create'} an Event</h2>
        <CloseIcon style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '50px', padding: '5px' }}
          onClick={() => {
            setcurrentId(null);
            setAddEvent(false);
          }}
        />
      </div>
      <div className='form-content'>
        <div className='form-input'>
          <span>Title:</span>
          <input
            type="text"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Description:</span>
          <textarea
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
          ></textarea>
        </div>
        <div className='form-input'>
          <span>Event Date:</span>
          <input
            type="text"
            value={event.event_date}
            onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Event Time:</span>
          <input
            type="text"
            value={event.event_time}
            onChange={(e) => setEvent({ ...event, event_time: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Event Location:</span>
          <input
            type="text"
            value={event.event_location}
            onChange={(e) => setEvent({ ...event, event_location: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>State:</span>
          <input
            type="text"
            value={event.state}
            onChange={(e) => setEvent({ ...event, state: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <span>Country:</span>
          <input
            type="text"
            value={event.country}
            onChange={(e) => setEvent({ ...event, country: e.target.value })}
          />
        </div>
        <div className='form-input'>
          <div className='add-tickets-div'>
            <span>Add Tickets</span>
            <AddEventPopup setEvent={setEvent} event={event} ticketCount={ticketCount} setTicketCount={setTicketCount} />
          </div>
          <div className='display-tickets'>
            {ticketCount === 0 ? <>
              <span>No tickets added</span>
            </> : <>
              {event.tickets.map((ticket, index) => {
                return (
                  <div key={index} className='form-1'>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                      <div>
                        <span>Name:</span>
                        <span style={{ fontWeight: 'normal' }}>{ticket.name}</span>
                      </div>
                      <DeleteForeverIcon style={{ color: "red", width: "50px", height: "40px" }} onClick={() => {
                        handleDeleteTicket(index);
                        console.log(event.tickets)
                      }} />
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
            </>}
          </div>
          <div className='form-input'>
            <span>Terms and Conditions:</span>
            <textarea
              value={event.terms}
              onChange={(e) => setEvent({ ...event, terms: e.target.value })}
            ></textarea>
          </div>
        </div>
        <div className='form-input'>
          <span>Poster:</span>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setEvent({ ...event, file: base64 })} />
          {
            event.file !== '' && <img src={event.file} alt="Poster" style={{ height: "110px", padding: "10px" }}></img>
          }
        </div>
        <div className='form-input'>
          <span>Registration Needed ?</span>
          <select
            style={{ padding: "10px", border: 'none', borderRadius: '10px' }}
            value={event.regOpen}
            onChange={(e) => setEvent({ ...event, regOpen: e.target.value })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className='form-buttons'>
          <button onClick={clearSubmit}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div >
  );
}
export default AdminEventForm;