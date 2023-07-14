import React from 'react'
import KeralaTourismLogo from '../../assets/images/kerala-tourism-logo.png'
import CulturaLogo from '../../assets/images/cultura-logo.png'
import './Banner.css'

const Banner = () => {
    return (
        <div className='banner-main'>
            <a href='https://www.cultura.org.au/' className='cultura' target='_blank' rel='noopener noreferrer'>
                    <img src={CulturaLogo} alt="Cultura" />
            </a>
        </div >
    )
}

export default Banner
