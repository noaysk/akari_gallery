const express = require('express');
const loginRoutes = express.Router();
const bcrypt = require("bcryptjs");

const userModel = require("../models/user");
//Login

loginRoutes.get("/login", (req, res) => {
    res.render("login", {
        form: "Login"
    })
});


loginRoutes.post("/login", (req, res) => {

    const { email, password } = req.body;

    let validation = { passed: true };

    validateLogin(email, validation);

    if (validation.passed) {
        if (req.session.user) {
            // User is already logged in.
            let dashboard = req.session.user.role;
            res.redirect(`/dashboard/${req.session.user.role}`);
        } else {
            let errors = [];
            userModel.findOne({
                email: req.body.email
            })
                .then(user => {
                    // Completed the search.
                    if (user) {
                        // Found the user document.
                        // Compare the password entered in the form with the one in the user document.
                        bcrypt.compare(password, user.password)
                            .then(isMatched => {
                                // Done comparing the passwords.

                                if (isMatched) {
                                    // Passwords match.

                                    // Create a new session and store the user document (object)
                                    // to the session.
                                    req.session.user = user.toJSON();
                                    req.session.user.role = req.body.role;
                                    res.locals.user = req.session.user;

                                    res.redirect(`/dashboard/${req.session.user.role}`);
                                }
                                else {
                                    // Passwords to not match.
                                    console.log("Passwords do not match.");
                                    errors.push("Sorry, your password does not match our database.");
                                    validation.password = "Sorry, you entered an invalid email and/or password.";

                                    res.render("login", {
                                        validation
                                    });
                                }
                            })
                            .catch(err => {
                                // Couldn't compare passwords.
                                console.log(`Unable to compare passwords ... ${err}`);
                                errors.push("Oops, something went wrong.");

                                res.render("login", {
                                    errors
                                });
                            });

                    }
                    else {
                        // User was not found in the database.
                        console.log("User not found in the database.");
                        errors.push("Email not found in the database.");
                        validation.password = "Sorry, you entered an invalid email and/or password.";

                        res.render("login", {
                            validation
                        });
                    }
                })
                .catch(err => {
                    // Couldn't query the database.
                    console.log(`Error finding the user in the database ... ${err}`);
                    errors.push("Oops, something went wrong.");

                    res.render("login", {
                        errors
                    });
                });

            //res.send("Success")
        }
    } else {
        res.render("login", {
            values: req.body,
            validation
        });
    }

});

loginRoutes.get("/logout", (req, res) => {

    // Clear the session from the memory.
    req.session.destroy();

    // Render the view.
    res.redirect("/");
});

function validateLogin(email, validation) {
    var mailformat = /\S+@\S+\.\S+/;

    if (typeof email !== 'string' || !email.match(mailformat)) {
        // email is not a string.... or, email isn't match.
        validation.passed = false;
        validation.email = "Please enter a valid email address."
    }
    if (typeof password !== 'string' || password.trim().length === 0) {
        passed = false;
        validation.password = "Please enter your password."
    }

}
module.exports = loginRoutes;