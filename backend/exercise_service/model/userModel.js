const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, default: "user" }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;