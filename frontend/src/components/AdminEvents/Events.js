import React from 'react';
import Event from './Event/Event';
import CircularProgress from '@mui/material/CircularProgress';
import './Events.css';

function Events({ events, setViewEvent, setAddEvent, currentId, setcurrentId }) {
    return (
        <div className="events-container">
            {events.length >= 0 ? (
                <div className="events-grid">
                    {events.map((item) => (
                        <Event key={item._id} item={item} setViewEvent={setViewEvent} setAddEvent={setAddEvent} currentId={currentId} setcurrentId={setcurrentId} />
                    ))}
                </div>
            ) : (
                <div className="loading-container">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}

export default Events;