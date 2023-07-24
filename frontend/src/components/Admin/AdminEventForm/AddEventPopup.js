import React, { useState } from 'react';
import './AddEventPopup.css';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const AddEventPopup = ({ event, setEvent, ticketCount, setTicketCount }) => {
  const [ticket, setTicket] = useState({
    name: '',
    description: '',
    pricing: []
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    setTicket(prevTicket => ({
      ...prevTicket,
      pricing: [
        ...prevTicket.pricing,
        { name: '', price: '' }
      ]
    }));
    console.log(ticket);
  };


  const clearTicket = () => {
    setTicket({
      name: '',
      description: '',
      pricing: []
    });
  }

  const handleDeleteEmptyPricing = (currentTicket) => {
    const updatedPricing = currentTicket.pricing.filter((item) => item.name !== '');
    return {
      ...currentTicket,
      pricing: updatedPricing
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTicket = handleDeleteEmptyPricing(ticket);
    setEvent(prevEvent => ({
      ...prevEvent,
      tickets: prevEvent.tickets.concat(updatedTicket)
    }));
    setTicketCount(ticketCount + 1);
    clearTicket();
    togglePopup();
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container">
      <button onClick={togglePopup} className='popup-btn'>Add Tickets</button>

      {isOpen && (
        <form onSubmit={handleSubmit}>
          <div className="popup">
            <div className='popup-1'>
              <h2>Create a Ticket</h2>
              <CloseIcon style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '50px' }}
                onClick={() => { togglePopup(); clearTicket() }} />
            </div>
            <div className='popup-2'>
              <input
                className=''
                placeholder='Ticket Name'
                required
                value={ticket.name}
                onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
              />
              <textarea
                placeholder='Ticket Description'
                required
                value={ticket.description}
                onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
              />
            </div>
            <label style={{ marginTop: "20px" }}>Ticket Pricing</label>
            <div className='popup-3'>
              {Object.keys(ticket.pricing).length === 0 ? <div>No pricing added</div> : <div>Pricing added</div>}
              {ticket.pricing.map((pricing, index) => (
                <div key={index} className='popup-4'>
                  <input
                    placeholder='Pricing Category'
                    value={pricing.name}
                    onChange={(e) => {
                      const updatedTicket = { ...ticket };
                      updatedTicket.pricing[index].name = e.target.value;
                      setTicket(updatedTicket);
                    }}
                  />
                  <input
                    placeholder='Price'
                    type='number'
                    value={pricing.price}
                    onChange={(e) => {
                      const updatedTicket = { ...ticket };
                      updatedTicket.pricing[index].price = e.target.value;
                      setTicket(updatedTicket);
                    }}
                  />
                </div>
              ))}

              <AddIcon style={{}} onClick={handleAdd}></AddIcon>
            </div>
            <input type='submit' className='popup-5'/>
          </div>
        </form>
      )
      }
    </div >
  );
};

export default AddEventPopup;
