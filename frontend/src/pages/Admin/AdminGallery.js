import React, { useState, useEffect } from 'react'
import GalleryPopup from '../../components/Admin/AdminGallery/Popup'
import * as api from '../../api';
import styles from './styles.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

const AdminGallery = () => {

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };

    const [gallery, setGallery] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.fetchGallery();
                setGallery(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [selectedId]);


    const deleteImage = async () => {
        if (selectedId) {
            try {
                const response = await api.deleteGalleryImage(selectedId, config);
                if (response.status === 200) {
                    setGallery(prevGallery => prevGallery.filter(item => item._id !== selectedId));
                }
            } catch (error) {
                console.error(error);
            }
            closeDeleteConfirmation();
        }
    };

    const openDeleteConfirmation = (id) => {
        setSelectedId(id);
        setDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setSelectedId(null);
        setDeleteConfirmation(false);
    };

    const GalleryCards = ({ item }) => {
        return (
            <div className="commitee_container"
                style={{ height: '200px', width: '250px' }}>
                <div className="committee_image">
                    <img src={item.imageURL ? item.imageURL : ''} alt="gallery_img" />
                </div>
                <div>
                    <DeleteIcon
                        onClick={() => openDeleteConfirmation(item._id)}
                        style={{ color: 'red', cursor: 'pointer' }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.committee_main}>

            <div>
                <div>
                    <div className="committe_cards">
                        {gallery.map((item, key) => (
                            <GalleryCards item={item} key={key} />
                        ))}
                    </div>
                </div>
            </div>

            <GalleryPopup gallery={gallery} setGallery={setGallery} />

            {deleteConfirmation && (
                <div className={styles.confirmation_dialog}>
                    <div className={styles.confirmation_content}>
                        <h2>Confirmation</h2>
                        <p>Are you sure you want to delete this Image?</p>
                        <div className={styles.confirmation_buttons}>
                            <button className={styles.confirmation_button} onClick={deleteImage}>
                                Yes, Delete
                            </button>
                            <button className={styles.confirmation_button}
                                onClick={closeDeleteConfirmation}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminGallery
