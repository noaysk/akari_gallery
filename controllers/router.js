const express = require("express");
const home = require("./home");
const login = require("./login");
const signup = require("./signup");
const menu = require("./menu");
const dashboard = require("./dashboard");
const loadData = require("./loadData");
const shoppingCart = require("./shoppingCart");


module.exports = function (app) {
    app.use("/", home);
    app.use("/home", home);
    app.use("/", login);
    app.use("/signup", signup);
    app.use("/menu", menu);
    app.use("/dashboard", dashboard);
    app.use("/load-data", loadData);
    app.use("/order", shoppingCart);
}
