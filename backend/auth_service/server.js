const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo database connection established successfully");
});

app.use('/auth', require('./routes/authRoutes'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
