import React from 'react';
import CulturaLogo from '../../assets/images/cultura-logo.png';
import './Banner.css';

const Banner = () => {
    return (
        <div className='banner-main'>
            <div className="contact_us">
                <h1>Affiliated to</h1>
            </div>
            <div className='cultura-container'>
                <a href='https://www.cultura.org.au/' className='cultura' target='_blank' rel='noopener noreferrer'>
                    <img src={CulturaLogo} alt="Cultura" />
                </a>
            </div>
        </div>
    );
};

export default Banner;
