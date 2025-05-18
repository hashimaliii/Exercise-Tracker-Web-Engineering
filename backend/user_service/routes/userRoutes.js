const router = require('express').Router();
const User = require('../model/userModel');
const protect = require('.././middleware/authMiddleware');

router.get('/', protect, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;