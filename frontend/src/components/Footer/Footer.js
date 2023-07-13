import React from 'react';
import { useLocation } from 'react-router-dom';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

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
              <p>12 Galactic Street</p>
              <p>Mt. Duneed, VIC 3217</p>
            </div>
          </div>
          <div className='location'>
            <PhoneIcon />
            <p>
              <a href='tel://+61476187075'>+61 476187075</a>
            </p>
          </div>
          <div className='location'>
            <EmailIcon />
            <p>
              <a href='mailto:mailto://geelongmalayaleeassociation@gmail.com' target='_blank' rel='noopener noreferrer'>
                geelongmalayaleeassociation@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className='footer_section'>
          <h4>Reach Us....</h4>
          <div className='social'>
            <a href='https://www.instagram.com/geelong_malayalee_association' target='_blank' rel='noopener noreferrer'>
              <InstagramIcon />
            </a>
            <a href='https://www.facebook.com/GeelongMalayaleeAssociation' target='_blank' rel='noopener noreferrer'>
              <FacebookIcon />
            </a>
            <a href='mailto:mailto://geelongmalayaleeassociation@gmail.com' target='_blank' rel='noopener noreferrer'>
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
