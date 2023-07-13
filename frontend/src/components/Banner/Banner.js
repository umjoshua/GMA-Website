import React from 'react'
import KeralaTourismLogo from '../../assets/images/kerala-tourism-logo.png'
import CulturaLogo from '../../assets/images/cultura-logo.png'
import './Banner.css'

const Banner = () => {
    return (
        <div className='banner-main'>
            <div className='kerala-tourism'>
                <img src={KeralaTourismLogo} alt="Kerala tourism" />
            </div>
            <div className='cultura'>
                <img src={CulturaLogo} alt="Cultura"/>
            </div>
        </div>
    )
}

export default Banner
