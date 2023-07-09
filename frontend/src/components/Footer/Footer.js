import React from 'react';
import { useLocation } from 'react-router-dom';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';

import './Footer.css';

function Footer() {
  const location = useLocation();

  return (
    <footer className='footer' style={{ visibility: location.pathname.includes('/admin') ? 'hidden' : 'visible' }}>
      <div className='footer_container'>
        <div className='footer_section'>
          <div className='location'>
            <LocationCityIcon />
            <div>
              <a href='https://maps.app.goo.gl/kuiSu981HsBggDBN8?g_st=ic' target='_blank' rel='noopener noreferrer'>
                <p>3922 Spadafore Drive</p>
                <p>Titusville, Pennsylvania, US</p>
              </a>
            </div>
          </div>
          <div className='location'>
            <PhoneIcon />
            <p>
              <a href='tel://+919087654321'>+91 9087654321</a>
            </p>
          </div>
          <div className='location'>
            <EmailIcon />
            <p>
              <a href='https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=association@gmail.com' target='_blank' rel='noopener noreferrer'>
                association@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className='footer_section'>
          <h4>Reach Us....</h4>
          <div className='social'>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <InstagramIcon />
            </a>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <LinkedInIcon />
            </a>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
