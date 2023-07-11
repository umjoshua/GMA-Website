import { CommitteeModel } from "../models/committeeModel.js";


export const GetCommittee = async (req, res) => {
    try {
        let response = await CommitteeModel.find();
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Internal server error" })
    }
}