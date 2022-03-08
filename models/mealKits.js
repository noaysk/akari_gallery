const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
    "title": {
        "type": String,
        "unique": true
    },
    "desc":{
        "type": String
    },
    "img": {
        "type": String
    }
})

const imagesModel = mongoose.model("img", imagesSchema);
module.exports = imagesModel;