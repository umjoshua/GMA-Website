import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
    file: {
        type: String,
        required: true,
    }
})

const GalleryModel = mongoose.model('GalleryModel', gallerySchema, 'GalleryImages');

export default GalleryModel;