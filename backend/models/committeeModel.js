import mongoose, { Schema } from "mongoose";

const committeeSchema = mongoose.Schema({
    name: String,
    position: String,
    file: String
});


export const CommitteeModel = mongoose.model("CommitteeModel", committeeSchema, "committeeSchema")