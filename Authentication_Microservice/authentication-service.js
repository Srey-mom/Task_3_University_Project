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

app.post("/login", async (req, res) => {
    // 1. Take emailid and pass from Postman
    const { emailid, pass } = req.body;

    try {
        // 2. Query MongoDB using your actual schema fields
        const user = await Person.findOne({ emailid: emailid, pass: pass });

        if (user) {
            // 3. Generate the token with the user's real role from the database
            const token = jwt.sign(
                { name: user.name, role: user.role || 'student' }, 
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