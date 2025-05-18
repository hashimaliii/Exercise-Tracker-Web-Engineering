const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use('/auth', createProxyMiddleware({
    target: 'http://auth-service:5001',
    changeOrigin: true,
    pathRewrite: {
        "^": "/auth",
    },
    secure: false,
}));

app.use('/users', createProxyMiddleware({
    target: 'http://user-service:5002',
    changeOrigin: true,
    pathRewrite: {
        "^": "/users",
    },
    secure: false,
}))

app.use('/excercises', createProxyMiddleware({
    target: 'http://exercise-service:5003',
    changeOrigin: true,
    pathRewrite: {
        "^": "/excercises",
    },
    secure: false
}))

app.listen(PORT, () => {
    console.log(`Server API Gateway is running on port ${PORT}`);
});
