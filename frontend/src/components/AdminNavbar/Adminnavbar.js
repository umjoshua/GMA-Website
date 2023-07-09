import React from 'react';
import './Adminnavbar.css';

const Adminnavbar = ({ setAdminPage }) => {
    return (
        <div className='admin-navbar'>
            <div className='buttons'>
                <button className='admin-navbar-button'
                    onClick={() => { setAdminPage(0) }}
                >
                    Add / View / Edit Events
                </button>
                <button className='admin-navbar-button'
                    style={{ backgroundColor: "black" }}
                    onClick={() => setAdminPage(1)}>
                    View Event Registrations
                </button>
            </div >
        </div >
    )
}

export default Adminnavbar
