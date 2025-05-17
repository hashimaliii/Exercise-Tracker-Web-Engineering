const jwt = require('jsonwebtoken');
const User = require('.././model/userModel');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'secret123');
            req.user = User.findById(decoded.id).select('-password');
            next();
        }
        catch (err) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}

module.exports = protect;