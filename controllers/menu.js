const express = require("express");

const menuRoutes = express.Router();
// setup another route to listen on /menu
// const mealKit=require('../models/data');
// const category=require('../models/data');

const mealKitsModel = require("../models/mealKits");

menuRoutes.get("/", function (req, res) {
    mealKitsModel.find({}).lean()
        .then(mealKits => {
            // build data
            let categoriesOfMealKit = mealKits.map(mealKit => mealKit.category);
            let uniqueCategories = new Set(categoriesOfMealKit);
            let categoryMealKitList = Array.from(uniqueCategories).map(category => mealKits.filter(x => x.category == category));
            //console.log(categoryMealKitList); //[ [western meals[{1}, {2}, {3}, {4}], name], [asian meals[{1},{2},{3}], name]]
            let categoryMealKitWithNameList = categoryMealKitList.map(mealKits => { return { list: mealKits, name: `${mealKits[0].category} style meal` } });
            res.render("menu", {
                mealKits: categoryMealKitWithNameList
            });
        })
});



menuRoutes.get("/meal-kit/:uid", function (req, res) {
    let uid = req.params.uid;
    mealKitsModel.findOne({ _id: uid }).lean()
    .then((foundMealKit) => {
            res.render("mealKitDesc", foundMealKit)
    })
});


menuRoutes.post("/mealKits", function (req, res) {
    let mealKit = req.body;
    if (req.files != null) {
        mealKit.file = req.files.image;
    }
    let imagePath = `static/images/${req.files.image.name}`;
    req.files.image.mv(imagePath)
        .then(() => {
            mealKitsModel.findOne({ title: mealKit.title })
                .then(mealKitFound => {
                    if (mealKitFound) {
                        validation.title = "title already exists.";
                        res.render(req.session.user.role, {
                            validation
                        });
                    } else {
                        // create new mealKit model
                        let newMealKit = new mealKitsModel({
                            title: mealKit.title,
                            desc: mealKit.description,
                            img: imagePath
                        });

                        // save mealKit into database
                        newMealKit.save((err) => {
                            if (err) {
                                console.log("Couldn't create the new mealKit: " + err);
                                res.render(req.session.user.role, {
                                    values: req.body,
                                    validation
                                });
                            }
                            else {
                                console.log("Successfully created a new mealKit for " + newMealKit.title);
                                res.redirect("/");
                            }
                        });
                    }
                })
        })
});

menuRoutes.post("/mealKits/update", function (req, res) {
    let mealKit = req.body;
    if (req.files != null) {
        let imagePath = `static/images/${req.files.image.name}`;
        mealKit.image = `/${imagePath}`;
        req.files.image.mv(imagePath)
            .then(() => {
                updateMealKit(mealKit, res);
            })
    } else {
        updateMealKit(mealKit, res);
    }     
});

function updateMealKit(mealKit, res) {
    mealKitsModel.findOne({ title: mealKit.title })
        .then(mealKitFound => {
            if (mealKitFound) {
                mealKitsModel.updateOne({
                    title: mealKit.title
                }, {
                    $set: {
                        desc: mealKit.description,
                        img: mealKit.image
                    }
                })
                .exec()
                .then(newMealKit => {
                    console.log(newMealKit);
                    res.redirect('/');
                });
            } else {
                console.log("no mealKits found")
                res.redirect('/');
            }
        });
}

function validateMealKit(mealKit, validation) {

    if (typeof mealKit.title !== 'string' || mealKit.title.trim().length === 0) {
        validation.passed = false;
        validation.title = "Please enter a title."
    }
    if (typeof mealKit.included !== 'string' || mealKit.included.trim().length === 0) {
        validation.passed = false;
        validation.included = "Please enter a included."
    }
    if (typeof mealKit.description !== 'string' || mealKit.description.trim().length === 0) {
        validation.description = false;
        validation.description = "Please enter a description."
    }
    if (isNaN(mealKit.price) || mealKit.price < 0) {
        validation.passed = false;
        validation.price = "Please enter a price."
    }
    if (isNaN(mealKit.cookingTime) || mealKit.cookingTime < 0) {
        validation.passed = false;
        validation.cookingTime = "Please enter a cookingTime."
    }
    if (isNaN(mealKit.servings) || mealKit.servings < 0) {
        validation.passed = false;
        validation.servings = "Please enter a servings."
    }
    if (isNaN(mealKit.calories) || mealKit.calories < 0) {
        validation.passed = false;
        validation.calories = "Please enter a calories."
    }
    if (typeof mealKit.isTopMeal !== 'string' || mealKit.isTopMeal.trim().length === 0) {
        if (mealKit.isTopMeal.toLowerCase() !== 'true' || mealKit.isTopMeal.toLowerCase() !== 'false') {
            validation.passed = false;
            validation.isTopMeal = "Please enter true or false."
        }
    }
    if (typeof mealKit.category !== 'string' || mealKit.category.trim().length === 0) {
        validation.passed = false;
        validation.category = "Please enter a category."
    }
    if (mealKit.file != null) {
        if (mealKit.file.mimetype === 'image/jpeg' ||
            mealKit.file.mimetype === 'image/png' ||
            mealKit.file.mimetype === 'image/gif') {
        } else {
            validation.passed = false;
            validation.category = "Please choose jpeg, gif or png file."
        }
    }

}

module.exports = menuRoutes;