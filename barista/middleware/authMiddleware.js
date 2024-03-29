// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await user.findOne({ _id: decoded._id, jwtToken: token });

        console.log("decoded: ", decoded);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Auth Middleware Error: ", error.message)
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
