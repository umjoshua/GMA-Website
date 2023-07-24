import React, { useState } from 'react'
import './Event.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import * as api from '../../../../api'

const Event = ({ item, setEvents, setViewEvent, setAddEvent, currentId, setcurrentId }) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const openDeleteConfirmation = (id) => {
        setSelectedEventId(id);
        setDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setSelectedEventId(null);
        setDeleteConfirmation(false);
    };

    const deleteEvent = async () => {
        if (selectedEventId) {
            try {
                const response = await api.deleteEvent(item._id, config)
                console.log(response);
                if (response.status === 200) {
                    const response = await api.fetchEvents();
                    setEvents(response?.data);
                    setDeleteConfirmation(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <div id='event-card'>
            <div id='event-title'>
                <span style={{ fontWeight: 'bold', fontSize: 'large' }}>{item.title}</span>
                <div>
                    <RemoveRedEyeIcon className='edit-icon' onClick={() => { setViewEvent(true); setcurrentId(item._id) }} />
                    <EditIcon className='edit-icon' onClick={() => { setAddEvent(true); setcurrentId(item._id) }} />
                    <DeleteForeverIcon className='edit-icon' onClick={
                        () => {
                            openDeleteConfirmation(item._id);
                        }
                    } />
                </div>
                {deleteConfirmation && (
                    <div className="confirmation_dialog">
                        <div className="confirmation_content">
                            <h2>Confirmation</h2>
                            <p>Are you sure you want to delete this committee member?</p>
                            <div className="confirmation_buttons">
                                <button className="confirmation_button" onClick={deleteEvent}>
                                    Yes, Delete
                                </button>
                                <button className="confirmation_button" onClick={closeDeleteConfirmation}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div id='event-image'>
                <img alt="Event Poster" src={item.file} />
            </div>
        </div>
    )
}

export default Event
