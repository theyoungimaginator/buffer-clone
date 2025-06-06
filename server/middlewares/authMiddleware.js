const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route (no token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
             return res.status(401).json({ success: false, error: 'User not found for this token' });
        }
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ success: false, error: 'Not authorized to access this route (invalid token)' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};