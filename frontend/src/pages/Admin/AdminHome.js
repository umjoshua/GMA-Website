import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import AdminEditEvents from './AdminEditEvents';
import AdminViewRegs from './AdminViewRegs';
import AdminEditCommittee from './AdminEditCommittee';
import AdminGallery from './AdminGallery.js';
import * as api from '../../api'

const AdminHome = ({ adminPage }) => {

    const [statusAuth, setStatusAuth] = useState(false);

    const token = localStorage.getItem("token")
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.checkAuthorization(config);
                if (response.status === 200) {
                    setStatusAuth(true)
                } else {
                    localStorage.removeItem("token");
                    window.location.reload();
                    console.log(response)
                }
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token");
                window.location.reload();
            }
        };

        fetchData();
    });

    return (
        <>{statusAuth &&
            <div className={styles.admin_home}>
                {
                    adminPage === 0 && <AdminEditEvents />
                }
                {
                    adminPage === 1 && <AdminViewRegs />
                }
                {
                    adminPage === 2 && <AdminEditCommittee />
                }
                {
                    adminPage === 3 && <AdminGallery />
                }
            </div>
        }
        </>
    )
}

export default AdminHome
