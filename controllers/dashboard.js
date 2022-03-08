const express = require('express');
const dashboardRoutes = express.Router();
const mealKitsModel = require("../models/mealKits");


dashboardRoutes.get("/customer", (req, res) => {
    if (req.session.user.role == "customer") {
        if(req.session.user.cart) {
            let cart = req.session.user.cart;
            let totals = req.session.user.totals;
            res.render("cart", {
                cart,
                totals
            })
        } else {
            res.redirect("/menu");
        }
    }
    else {
        res.redirect("/home");
    }
});
dashboardRoutes.get("/clerk", (req, res) => {
    mealKitsModel.find({}).lean()
        .then(images => {
            res.render("clerkmenu", { images: images});
        })
});
module.exports = dashboardRoutes;