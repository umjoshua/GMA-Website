import React from 'react'
import './Event.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const Event = ({ item, setViewEvent, setAddEvent, currentId, setcurrentId }) => {
    return (
        <div id='event-card'>
            <div id='event-title'>
                <span style={{ fontWeight: 'bold', fontSize: 'large' }}>{item.title}</span>
                <div>
                    <RemoveRedEyeIcon className='edit-icon' onClick={() => { setViewEvent(true); setcurrentId(item._id) }} />
                    <EditIcon className='edit-icon' onClick={() => { setAddEvent(true); setcurrentId(item._id) }} />
                    <DeleteForeverIcon className='edit-icon' />
                </div>
            </div>
            <div id='event-image'>
                <img alt="Event Poster" src={item.file} />
            </div>
        </div>
    )
}

export default Event
