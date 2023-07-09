import React from 'react'
import styles from "./styles.module.css";
import AdminEditEvents from './AdminEditEvents';
import AdminViewRegs from './AdminViewRegs';


const AdminHome = ({ adminPage }) => {
    console.log(adminPage)
    return (
        <div className={styles.admin_home}>
            {
                adminPage === 0 && <AdminEditEvents />
            }
            {
                adminPage === 1 && <AdminViewRegs />
            }
        </div>
    )
}

export default AdminHome
