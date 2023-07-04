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

const AdminModel = mongoose.model('AdminModel',adminSchema,'AdminDetails');

export default AdminModel;

