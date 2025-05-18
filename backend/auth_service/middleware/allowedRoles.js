function allowedRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.query.role)) {
            return res.status(403).json({ message: 'Forbidden: Access denied' })
        }
        next();
    };
}

module.exports = allowedRoles;