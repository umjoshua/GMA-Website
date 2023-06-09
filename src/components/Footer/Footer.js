import React from 'react'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';


import './Footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className='footer_container'>
                <div className='left'>
                    <div className='location'>
                        <LocationCityIcon />
                        <div>
                            <a href="https://maps.app.goo.gl/kuiSu981HsBggDBN8?g_st=ic" target='_blank' rel="noopener noreferrer">
                                <p>3922 Spadafore Drive</p>
                                <p>Titusville, Pennsylvania, US</p>
                            </a>
                        </div>
                    </div>
                    <div className='location'>
                        <PhoneIcon /> <p><a href="tel://+919087654321" > +91 9087654321</a></p>
                    </div>
                    <div className='location'>
                        <EmailIcon /> <p><a href='https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=association@gmail.com' target='_blank' rel="noopener noreferrer">association@gmail.com</a></p>
                    </div>

                </div>


                <div className='right'>
                    <h4>Reach Us....</h4>
                    <div className='social'>
                        <a href="#" target='_blank' rel="noopener noreferrer"><InstagramIcon /></a>
                        <a href="#" target='_blank' rel="noopener noreferrer"><LinkedInIcon /></a>
                        <a href="#" target='_blank' rel="noopener noreferrer"><SchoolIcon /></a>
                    </div>
                </div>
                <div className='right'>
                    <h4>About Us....</h4>

                    <div className='social'>
                        <p>An American malayalee association formed to help the Keralites residing in United States of America</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer