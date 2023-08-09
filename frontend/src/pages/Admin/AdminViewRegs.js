import React, { useState, useEffect } from 'react';
import * as api from '../../api'
import styles from './styles.module.css';

const AdminViewRegs = () => {
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    }
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.getEventsList(config)
                setEvents(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, []);

    console.log(events);



    const handleDownloadRegistrationData = async (eventId) => {
        try {
            const response = await api.getEventRegs(eventId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                responseType: 'blob',
            })

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'registration_data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading registration data:', error);
        }
    };

    return (
        <div className={styles.viewReg1}>
            <div>
                {events && events.length > 0 ? events.map((event) => {
                    return (
                        <div key={event._id} className={styles.viewReg2}>
                            <h4>{event.title}</h4>
                            <p><span style={{ fontWeight: 'bold', color: 'brown' }}>
                                Total Registrations:
                            </span> {event.totalRegistrations}
                            </p>

                            {event?.ticketTypeCounts && Object.keys(event.ticketTypeCounts).length > 0 ? (
                                <div>
                                    <p style={{ marginTop: "10px", marginBottom: '5px', fontWeight: 'bold' }}>Ticket type wise count: </p>
                                    {Object.entries(event.ticketTypeCounts).map(([ticketType, count]) => (
                                        <li key={ticketType}>
                                            <span style={{ color: 'green' }}>{ticketType}</span>: {count}
                                        </li>
                                    ))}
                                </div>
                            ) : (
                                <p>No data.</p>
                            )}

                            {event?.ticketsLeft && Object.keys(event.ticketsLeft).length > 0 ? (
                                <div>
                                    <p style={{ marginTop: "10px", marginBottom: '5px', fontWeight: 'bold' }}>Tickets Left: </p>
                                    {Object.entries(event.ticketsLeft).map(([name, val]) => (
                                        <li key={name}>
                                            <span style={{ color: 'green' }}>{name}</span>: {val}
                                        </li>
                                    ))}
                                </div>
                            ) : <p>No data.</p>}

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className={styles.viewReg3} onClick={() => handleDownloadRegistrationData(event._id)}>
                                    Download Registration Data
                                </button>
                            </div>

                        </div>
                    )
                }) : (
                    <p>No event registrations found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminViewRegs;
