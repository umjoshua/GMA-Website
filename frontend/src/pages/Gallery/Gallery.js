import React, { useEffect, useState } from 'react'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import './Gallery.css'

import * as api from '../../api';

const Gallery = () => {

    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.fetchGallery();
            if (response?.data.length >= 1) {
                const images = response.data.map((item) => ({
                    src: item.imageUrl,
                }))
                setImages(images)
            }
        };
        fetchData();
    }, [])

    console.log(images)

    return (
        <div>
            {
                images.length >= 1 &&
                <Carousel
                    images={images}
                    hasThumbnails={true}
                    maxIcon={false} thumbnailHeight='50px'
                    className='gallery'
                />
            }
        </div>
    )
}

export default Gallery
