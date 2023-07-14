import React, { useState } from 'react';
import './TermsPopup.css';
import CloseIcon from '@mui/icons-material/Close';

const TermsPopup = ({ terms }) => {

  const [isOpen, setIsOpen] = useState(false);


  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container">
      <button onClick={(e) => { e.preventDefault(); togglePopup() }} className='terms-btn'>
        Terms and conditions
      </button>

      {isOpen && (
        <div className='popup'>
          <div className='terms-header'>
            <h3>Terms and Conditions</h3>
            <CloseIcon onClick={(e) => { e.preventDefault(); togglePopup(); }} style={{
              backgroundColor: 'yellow',
              color: 'red',
              padding: '5px',
              height: '100%',
              width: '30px',
              borderRadius: '50px'
            }} />
          </div>
          <div className='terms-content'>
            {terms}
          </div>
          <button style={{
            padding: '10px',
            borderRadius: '10px',
            borderStyle: 'none',
            color: 'white',
            backgroundColor: 'blue',
          }}
            onClick={(e) => { e.preventDefault(); togglePopup(); }}
          >

            Close
          </button>
        </div>
      )
      }
    </div >
  );
};

export default TermsPopup;
