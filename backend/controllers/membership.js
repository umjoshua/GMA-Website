import MembershipModel from "../models/membershipModel.js";

export const MembershipRegister = async (req, res) => {
    try {
        const regData = req.body;
        const newData = new MembershipModel(regData);
        await newData.save()
        res.json(regData);
    } catch (err) {
        console.log(err)
    }
}