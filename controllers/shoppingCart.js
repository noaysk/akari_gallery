const express = require("express");
const mealKitsModel = require("../models/mealKits");
const shoppingCartRoutes = express.Router();
const sgMail = require("@sendgrid/mail");

shoppingCartRoutes.post("/meal-kit", (req, res) => {
    let validation = {};
    let mealKitId = req.body._id;

    if (req.session && req.session.user && req.session.user.role == "customer") {
        let cart = req.session.user.cart = req.session.user.cart || [];
        // find meal-kit
        mealKitsModel.findOne({ _id: mealKitId }).lean()
            .then(mealKitFound => {
                if (findMealKitInCart(mealKitId, cart)) {
                    cart.find(mealKit => mealKit.id === mealKitId).qty++;
                    req.session.user.totals = calculateTotals(cart);
                    validation.message = "MealKit was already in the cart, incremented the quantity by one.";
                    req.session.save();
                } else {
                    cart.push({
                        id: mealKitId,
                        qty: 1,
                        mealKit: mealKitFound
                    })
                    req.session.user.totals = calculateTotals(cart);
                    validation.message = "MealKit added to the shopping cart.";
                    req.session.save();
                }
                res.redirect("/menu");
            }
            ).catch(err => {
                validation.message = "MealKit not found in the database.";
                //render menu
            });
    } else {
        validation.message = "you must login as customer to order";
        res.render("login", {
            form: "Login",
            validation
        });
    }

});

shoppingCartRoutes.post("/checkout", (req, res) => {
    let validation = {};
    if (req.session && req.session.user && req.session.user.role == "customer") {
        sendOrderEmail(req.session.user);
        req.session.user.cart = {};
        req.session.user.totals = {totalItem: 0, subTotal: 0};
        req.session.save();
        res.render("thankyou");
    } else {
        validation.message = "you must login as customer to order";
        res.render("login", {
            form: "Login",
            validation
        });
    }
});

function findMealKitInCart(mealKitId, cart) {
    let found = false;
    cart.forEach(mealKit => {
        if (mealKit.id == mealKitId) {
            found = true;
        }
    })
    return found;
}

function calculateTotals(cart) {
    let totals = {}
    totals.totalItem = cart.reduce((product, item) => product + item.qty, 0);
    totals.subTotal = cart.reduce((product, item) => product + (item.mealKit.price * item.qty), 0);
    return totals;
}

function sendOrderEmail(user) {
    orders = user.cart.map(item => `<li>${item.mealKit.title}, qty: ${item.qty}</li>`);
    ordersString = orders.join('\n');
    const msg = {
        to: user.email,
        from: 'nyasukagawa@myseneca.ca',
        subject: 'Your order',
        html:
            `Thank you for ordering from Noa's Food<br>
                Visitor's Full Name: ${user.firstName} ${user.lastName}<br>
                This is your order<br>
                <ul>
                ${ordersString}
                <ul>
                Your subtotal is ${user.totals.subTotal};
                Visitor's Email Address: ${user.email}<br>
                `
    }

    sgMail.send(msg)
        .then(() => {
            // Validation passed, sent out an email.
            console.log("email sent successfully");
        })
        .catch(err => {
            console.log(`Error ${err}`);
        });
}

module.exports = shoppingCartRoutes;