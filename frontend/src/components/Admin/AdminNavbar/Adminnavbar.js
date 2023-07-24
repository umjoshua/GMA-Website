import React, { useState } from 'react';
import './Adminnavbar.css';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from '../../../assets/images/logo.png';

const Adminnavbar = ({ setAdminPage }) => {
    const [icon, setIcon] = useState(false);

    const setPage = (page) => {
        setAdminPage(page);
        setIcon(false);
    }

    return (
        <div className='admin-navbar'>
            <div className="logo-div">
                <img src={Logo} alt="logo" className="logo" />
                <h2>GMA Dashboard</h2>
            </div>
            <div className={icon ? 'admin_nav_menu active' : 'admin_nav_menu'}>
                <div className='buttons'>
                    <button className='admin-navbar-button'
                        onClick={() => { setPage(0) }}
                    >
                        View / Edit Events
                    </button>
                    <button className='admin-navbar-button'
                        style={{ backgroundColor: "black" }}
                        onClick={() => setPage(1)}>
                        View Event Registrations
                    </button>
                    <button className='admin-navbar-button'
                        style={{ backgroundColor: "orange" }}
                        onClick={() => setPage(2)}>
                        View / Edit Committee
                    </button>
                    <button className='admin-navbar-button'
                        style={{ backgroundColor: "green" }}
                        onClick={() => { setPage(3) }}
                    >
                        Gallery
                    </button>
                    <button className='admin-navbar-button'
                        style={{ backgroundColor: "red" }}
                        onClick={() => { localStorage.clear("token"); window.location.reload() }}
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <div className="hamburger" onClick={() => setIcon(!icon)}>
                {icon ? <CloseIcon style={{ color: 'white' }} /> : <MenuIcon />}
            </div>
        </div >
    )
}

export default Adminnavbar
