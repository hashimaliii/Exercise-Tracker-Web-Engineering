const router = require('express').Router();
const User = require('.././model/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
    return jwt.sign({ id }, 'secret123', { expiresIn: '2h' });
}

router.post('/register', async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if (!username || !password) {
        return res.status(400).json({ message: "Please fill all the required fields" })
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: "User already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save()
        .then(() => res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            role: newUser.role,
            token: generateToken(newUser._id)
        }))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;