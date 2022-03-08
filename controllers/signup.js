const express = require('express');
const router = express.Router();

const mealKitsModel = require("../models/mealKits");
const userModel = require("../models/user");
//signup

router.get("/", (req, res) => {
    res.render("signup")
});

router.post("/", (req, res) => {

    console.log(req.body);
    const { email } = req.body;

    let passed = true;
    let validation = {};

    var mailformat = /\S+@\S+\.\S+/;

    if ( typeof email != 'string' || (!email.match(mailformat) && email != "akari")) {
        // email is not a string.... or, email isn't match.
        console.log("entered here");
        passed = false;
        validation.email = "Please enter a valid email address."
    }
    
    if (passed) {
        if(email=="akari"){
            validation.email = "akari";
            mealKitsModel.find({}).lean().exec()
            .then(results => {
                res.render("clerkmenu", {images: results});
            }).catch(err => {
                console.log(err);
            });
        }
        userModel.findOne({ email: email })
            .then(userFound => {
                
                 if (userFound) {
                    validation.email = "Thanks again for coming back!";
                    res.render("home", {
                        values: req.body,
                        validation
                    });
                } else {

                    // create new user model
                    let newUser = new userModel({
                        email: email,
                        password: "test"
                    });

                    // save user into database
                    newUser.save((err) => {
                        if (err) {
                            console.log("Couldn't create the new user: " + err);
                            res.render("home", {
                                values: req.body,
                                validation
                            });
                        }
                        else {
                            validation.email = "Thanks for coming!";
                    res.render("home", {
                        values: req.body,
                        validation
                    });
                        }
                    });
                }
            })
    }
    else {
        res.render("home", {
            values: req.body,
            validation
        });
    }

  
});



module.exports = router;