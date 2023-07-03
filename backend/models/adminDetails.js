import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }  
})

const AdminDetails = mongoose.model('AdminDetails',adminSchema,'AdminDetails');

export default AdminDetails;

