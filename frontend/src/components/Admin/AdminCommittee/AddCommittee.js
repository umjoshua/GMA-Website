import React, { useState } from 'react';
import './AddCommittee.css';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import FileBase from 'react-file-base64';
import * as api from '../../../api'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AddCommittee = ({ addCommittee, setAddCommittee, setCommittee }) => {

    const [committeeData, setCommitteeData] = useState({
        name: '',
        position: 'President',
        file: '',
    });

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [addError, setAddError] = useState(null);

    const postdata = async () => {
        setLoading(true);
        try {
            const { data } = await api.addCommittee(committeeData, config);
            if (data) {
                setCommittee(data);
                setAddCommittee(false);
                setIsOpen(false);
            }
        } catch (error) {
            setAddError('Failed to add committee. Please try again later.');
        }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postdata();
    };

    const clearData = () => {
        setCommitteeData({
            name: '',
            position: 'President',
            file: '',
        });
        setAddError(null);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCommitteeData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
        clearData();
    };

    return (
        <div className="popup-container">
            <div className="add_event_icon" onClick={togglePopup} style={{ visibility: addCommittee ? "hidden" : "visible", background: 'orange' }}>
                <AddIcon style={{ color: "white" }} />
            </div>

            {isOpen && (
                <form onSubmit={handleSubmit}>
                    <div className="popup">
                        <div className='popup-1'>
                            <h2>Add Committee</h2>
                            <CloseIcon style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '50px' }}
                                onClick={togglePopup} />
                        </div>
                        <div className='committee-1'>
                            <input
                                type='text'
                                placeholder='Name'
                                className='committee-2'
                                name="name"
                                value={committeeData.name}
                                onChange={handleChange}
                            ></input>
                            <select
                                name="position"
                                value={committeeData.position}
                                onChange={handleChange}
                                className='committee-2'
                                required
                            >
                                <option value="President">President</option>
                                <option value="Vice President">Vice President</option>
                                <option value="Secretary">Secretary</option>
                                <option value="Joint Secretary">Joint Secretary</option>
                                <option value="Treasurer">Treasurer</option>
                                <option value="Executive Member">Executive Member</option>
                            </select>
                            <div className='committee-2'>
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => setCommitteeData({ ...committeeData, file: base64 })}
                                />
                            </div>
                            {committeeData.file !== '' &&
                                <img src={committeeData.file} alt='preview' style={{ height: "100px" }}></img>
                            }
                        </div>
                        <input type='submit' className='popup-5' />
                        {addError && <p className='add-error'>{addError}</p>}
                    </div>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            )}
        </div>
    );
};

export default AddCommittee;