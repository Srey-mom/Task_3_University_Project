const express = require('express');
const app = express();

app.post('/submitassignment', (req, res) => {
    res.send('<html><body>INSIDE STUDENT SUBMIT ASSIGNMENT API..</body></html>');
});

//VIEW API
app.get('/viewassignment', (req, res) => {
    res.send('<html><body>INSIDE STUDENT VIEW ASSIGNMENT API..</body></html>');
});


//UPDATE API
app.put('/studentupdateprofile', (req, res) => {
    res.send('<html><body>INSIDE STUDENT UPDATE PROFILE API..</body></html>');
});

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5000, () =>
    console.log('EXPRESS Server Started at Port No: 5000'));


