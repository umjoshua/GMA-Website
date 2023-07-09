import React from 'react';
import Event from './Event/Event';
import CircularProgress from '@mui/material/CircularProgress';
import './Events.css';
import events from '../../data/EventData/EventData';

function Events({ currentId, setcurrentId }) {
    return (
        <div className="events-container">
            {events.length ? (
                <div className="events-grid">
                    {events.map((item) => (
                        <Event key={item._id} item={item} currentId={currentId} setcurrentId={setcurrentId} />
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