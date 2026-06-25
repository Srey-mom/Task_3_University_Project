const express = require('express');
const app = express()

//USE PROXY SERVER TO REDIRECT THE INCOMMING REQUEST
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();

const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRETE = process.env.JWT_SECRETE;

function authToken(req, res, next) {
    console.log(req.headers.authorization)
    const header = req?.headers.authorization;
    const token = header && header.split(' ')[1];

    if (token == null) return res.status(401).json("Please send token");

    jwt.verify(token, JWT_SECRETE, (err, user) => {
    // CHANGE THIS LINE:
    if (err) return res.status(403).json({ message: "Invalid token", error: err.message });
    
    req.user = user;
    next();
});
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json("Unauthorized");
        }
        next();
    };
}

// REDIRECT TO THE REGISTRATION MICROSERVICE
app.use("/registration", (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:5003' });
});

//REDIRECT TO THE STUDENT MICROSERVICE
app.use('/student', authToken, authRole('student'), (req, res) => {
    console.log("INSIDE API GATEWAY STUDENT ROUTE");
    
    // ADD THIS LINE BELOW TO STRIP THE PREFIX:
    req.url = req.url.replace(/^\/student/, '') || '/';
    
    // Change this to target localhost/127.0.0.1 since it's on the same EC2 machine
    proxy.web(req, res, { target: 'http://3.92.184.105:5000' });
});

//REDIRECT TO THE TEACHER MICROSERVICE
app.use('/teacher', authToken, authRole('teacher'),(req, res) => {
    console.log("INSIDE API GATEWAY TEACHER ROUTE")
    proxy.web(req, res, { target: 'http://35.171.4.17:5001' });
});

//REDIRECT TO THE LOGIN(Authentication) MICROSERVICE
app.use('/auth', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:5002' });
});

app.listen(4000, () => {
    console.log("API Gateway Service is running on PORT NO : 4000")
});