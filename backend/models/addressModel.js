import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    number: {
        type: String,
        required: true,
    }
})

const AddressModel = mongoose.model('AddressModel', addressSchema, 'Address');

export default AddressModel;