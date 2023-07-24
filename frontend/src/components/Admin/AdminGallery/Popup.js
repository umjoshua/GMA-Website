import React, { useState } from 'react';
import './styles.css';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as api from '../../../api';

const GalleryPopup = ({ gallery, setGallery }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [imageURL, setimageURL] = useState('');

    const [loading, setLoading] = useState(false);

    const [addError, setAddError] = useState(null);

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };

    const postdata = async () => {
        setLoading(true);
        try {
            const { data } = await api.addGalleryImage({ imageURL }, config);
            if (data) {
                setGallery([...gallery, data]);
                setIsOpen(false);
            }
        } catch (error) {
            setAddError('Failed to add image. Please try again later.');
        }
        setLoading(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        postdata();
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
        setimageURL('');
    };

    return (
        <div className="popup-container">
            <div className="add_event_icon" onClick={togglePopup} style={{ visibility: isOpen ? "hidden" : "visible", background: 'green' }}>
                <AddIcon style={{ color: "white" }} />
            </div>
            {isOpen && (

                <div className="popup">
                    <div className='gp-1'>
                        <h2>Add Gallery Image</h2>
                        <CloseIcon style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '50px' }}
                            onClick={togglePopup} />
                    </div>
                    <form className='form-input' style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
                        <input
                            placeholder='Image URL' required
                            style={{ height: '30px' }}
                            value={imageURL}
                            onChange={(e) => { setimageURL(e.target.value) }}
                        />
                        <input type="submit"
                            style={
                                { backgroundColor: 'green', color: 'white', marginTop: "10px", height: '30px' }
                            }
                        />
                        {addError && <p className='add-error' style={{ color: 'red' }}>{addError}</p>}
                    </form>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            )
            }
        </div >
    );
};

export default GalleryPopup;
