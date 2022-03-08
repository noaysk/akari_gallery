const express = require("express");
const mealKitsModel = require("../models/mealKits");

const homeRoutes = express.Router();
// setup a 'route' to listen on the default url path (http://localhost)
homeRoutes.get("/", function (req, res) {

    mealKitsModel.find({}).lean().exec()
    .then(results => {
        res.render("home", {images: results});
    }).catch(err => {
        console.log(err);
    });
    // mealKitsModel.find({isTopMeal: true}).lean().exec()
    // .then(mealKits => {
    //     res.render("home", { mealKits: [{ list: mealKits, name: "Top Meal Kits" }]})
    // }
    // )
});

// setup another route to listen on /about
homeRoutes.get("/about", function (req, res) {
    res.render("about")
});
module.exports = homeRoutes;