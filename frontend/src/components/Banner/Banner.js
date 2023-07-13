import React from 'react'
import KeralaTourismLogo from '../../assets/images/kerala-tourism-logo.png'
import CulturaLogo from '../../assets/images/cultura-logo.png'
import './Banner.css'

const Banner = () => {
    return (
        <div className='banner-main'>
            <a href='https://www.keralatourism.org/' target='_blank' rel='noopener noreferrer'>
                <div className='kerala-tourism'>
                    <img src={KeralaTourismLogo} alt="Kerala tourism" />
                </div>
            </a>
            <a href='https://www.cultura.org.au/' target='_blank' rel='noopener noreferrer'>
                <div className='cultura'>
                    <img src={CulturaLogo} alt="Cultura" />
                </div>
            </a>
        </div >
    )
}

export default Banner
