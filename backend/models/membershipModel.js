import mongoose, { Schema } from "mongoose";

const membershipSchema = mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    address1: String,
    address2: String,
    suburb: String,
    state: String,
    postcode: String,
    country: String,
    areaCode: String,
    phNo: String,
    email: String,
    gender: String,
    age: Number,
    bloodGroup: String,
    keralaContactFname: String,
    keralaContactLname: String,
    keralaPhNo: String,
    spouceFname: String,
    spouceMname: String,
    spouceLname: String,
    spoucePhNo: String,
    spouceEmail: String,
    familyMemberDetails: String,
    pContactMethod: String,
    membershipType: String,
    membershipFeePaid: Boolean,
})

const MembershipModel = mongoose.model("MembershipModel", membershipSchema, "MembershipDetails")

export default MembershipModel 