import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Invalid token' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        res.status(401).json({ msg: 'Nice try! Better luck next time.' });
    }
}

export default auth