import React from 'react'
import './Event.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Event = ({ item, currentId, setcurrentId }) => {
    console.log(item)
    return (
        <div id='event-card'>
            <div id='event-title'>
                {item.title}
                <div>
                    <EditIcon className='edit-icon' onClick={() => setcurrentId(item._id)} />
                    <DeleteForeverIcon className='edit-icon' />
                </div>
            </div>
            <div id='event-image'>
                <img alt="Event Poster" src={item.eventImage} />
            </div>
            <div className='event_item'>
                <span style={{ fontWeight: 'bold' }}>Description: </span>
                {item.description}
            </div>
            <div className='event_item'>
                <span style={{ fontWeight: 'bold' }}>Date: </span>
                {item.event_date}
            </div>
            <div className='event_item'>
                <span style={{ fontWeight: 'bold' }}>Time: </span>
                {item.event_time}
            </div>
            <div className='event_item'>
                <span style={{ fontWeight: 'bold' }}>Location: </span>
                {item.event_location}, {item.state}, {item.country}
            </div>
            <div className='event_item'>
                <span style={{ fontWeight: 'bold' }}>Amount: </span>
                <span>Child: {item.amountChild}</span>
                <span>Adult: {item.amountAdult}</span>
            </div>
        </div>
    )
}

export default Event
