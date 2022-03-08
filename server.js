/************************************************************************************ 
*  WEB322 – Project (Fall 2021) 
*  I declare that this assignment is my own work in accordance with Seneca Academic 
*  Policy. No part of this assignment has been copied manually or electronically from 
*  any other source (including web sites) or distributed to other students. 
*   
*  Name: Noa Yasukagawa
*  Student ID:  146086194
*  Course/Section:  WEB322 ZAA
*  GitHub Repository: https://github.com/web322_assign6/ 
*  Heroku URL: https://web322assign6.herokuapp.com/
*  
*  
************************************************************************************/

//Include the libraries
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const sgMail = require("@sendgrid/mail");
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require("express-fileupload");

//configuration
dotenv.config({ path: "./config/keys.env" });
mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const router = require('./controllers/router');

//Initialize express app 
const app = express();

//set view engine
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');

// Set up express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next)=>{
    // res.locals.user is a global handlebars variable.
    // This means that ever single handlebars file can access that user variable
    res.locals.user = req.session.user;
    next();
});

// Set up express-fileupload
app.use(fileUpload());

// apply middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// Start listening
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Web Server is up and running, port ${PORT}`);
});

//Import routes to be served
router(app);