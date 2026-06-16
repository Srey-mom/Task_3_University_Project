const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 1. IMPORT & EXECUTE DATABASE CONNECTION
// This will instantly execute the run() function inside your original dbconnect.js
require('./dbconnect'); 

// 2. IMPORT YOUR MONGOOSE SCHEMA
// Adjust the path './person_schema' if your file is named slightly differently or in another folder
const Person = require('./person_schema'); 

app.use(express.json());

const JWT_SECRETE = process.env.JWT_SECRETE;

// (You can delete or comment out the hardcoded 'users' array now!)

// 3. UPDATE THE LOGIN ROUTE TO BE ASYNCHRONOUS (async/await)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in your MongoDB collection matching the username and password
        // Adjust fields (e.g., 'username' vs 'email') based on your exact schema definition
        const user = await Person.findOne({ username: username, password: password });

        if (user) {
            // Generate token using data from the database document
            const token = jwt.sign(
                { username: user.username, role: user.role || 'student' }, 
                JWT_SECRETE, 
                { expiresIn: '24h' }
            );
            return res.json({ token });
        }
        
        return res.status(400).send("Invalid user");
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(5002, () => {
    console.log('Authentication Service Server is running on PORT NO: 5002');
});