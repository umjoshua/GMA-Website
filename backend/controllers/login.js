import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from "../models/adminModel.js"


export const adminLogin = async (req, res) => {
    try {
    const { username, password } = req.body;
        let user = await AdminModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'incorrect username' });
        }
        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res.status(400).json({ msg: 'incorrect password' });
        }

        const payload = {
            id: user._id,
        };

        const signOptions = {
            expiresIn: "23h",
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            signOptions
        );

        res.json({token});
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }   
}