import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { getPhoneNumber } from '../../api'

import './Footer.css';

function Footer() {

  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPhoneNumber()
        setPhone(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const location = useLocation();

  return (
    <footer className='footer' style={{ visibility: location.pathname.includes('/admin') ? 'hidden' : 'visible' }}>
      <div>
        <div className='footer_container'>
          <div className='footer_section'>
            <div className='location'>
              <PhoneIcon />
              <p>
                <a href='tel://+61476187075'>+61 476187075</a>
                {/* <a href={`tel:${phone}`}>{phone}</a> */}
              </p>
            </div>
            <div className='location'>
              <EmailIcon />
              <p>
                <a href='mailto://geelongmalayaleeassociation@gmail.com' target='_blank' rel='noopener noreferrer'>
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
              <a href='mailto://geelongmalayaleeassociation@gmail.com' target='_blank' rel='noopener noreferrer'>
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: 'small' }}>
        &copy; 2023 GMA - All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
