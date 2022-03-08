const express = require('express');
const loadDataRoutes = express.Router();

const mealKitsModel = require("../models/mealKits");
//const { count }= require("../models/mealKits");
const data = require('../models/data');


loadDataRoutes.get("/meal-kits", (req, res) => {
    if (req.session.user.role == "clerk") {
        mealKitsModel.count({})
            .then((counter) => {
                console.log("There are: " + counter);
                if (counter == 0) {
                    mealKitsModel.insertMany(data.getMealData())
                        .then((result) => {
                            console.log("Added meal kits to the database");
                            res.render('loadData', { message: "Added meal kits to the database" })
                        })
                        .catch((err) => console.log(err));
                }
                else {
                    res.render('loadData', { message: "Meal kits have already been added to the database" })

                }
            }
            ).catch((error) => console.log(error));

    }

    else {
        res.render('loadData', { message: "You are not authorized to add meal kits" })
    }

});


module.exports = loadDataRoutes;


