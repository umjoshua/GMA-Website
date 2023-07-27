import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import * as api from '../../api';



const Gallery = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.fetchGallery();
            if (response?.data.length >= 1) {
                const images = response.data.map((item) => ({
                    original: item.imageURL,
                    thumbnail: item.imageURL,
                }))
                setImages(images)
            }
        };
        fetchData();
    }, [])

    const getThumbnailWidth = () => {
        const windowWidth = window.innerWidth;
        // You can adjust the values below based on your design and responsiveness requirements
        if (windowWidth <= 767) {
            return 50;
        } else if (windowWidth <= 1024) {
            return 100;
        } else {
            return 150;
        }
    };

    const getOriginalImageWidth = () => {
        const windowWidth = window.innerWidth;
        // You can adjust the values below based on your design and responsiveness requirements
        if (windowWidth <= 767) {
            return 300;
        } else if (windowWidth <= 1024) {
            return 600;
        } else {
            return 1000;
        }
    };
    

    return (
        <div style={{ marginTop: "50px", marginBottom: "50px", maxWidth: '99%' }}>
            <ImageGallery
                items={images}
                thumbnailWidth={getThumbnailWidth()}
                renderItem={(item) => (
                    <div style={{ height: '70vh' }}>
                        <img
                            src={item.original}
                            alt={item.originalAlt}
                            width={getOriginalImageWidth()}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                )}
            />
        </div>
    )
}

export default Gallery
