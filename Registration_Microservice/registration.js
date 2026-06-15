const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

//REG API
app.post('/reg', (req, res) => {
  console.log("REG API EXECUTED")
  const pobj = new PersonModel({
    id: uniqueid(1000, 9999),
    name: req.body.firstname,
    emailid: req.body.email,
    pass: req.body.password,
    mobile: req.body.mobile,
    role: req.body.role
  });//CLOSE PersonModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  pobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5003, () => console.log('EXPRESS Server Started at Port No: 5003'));
