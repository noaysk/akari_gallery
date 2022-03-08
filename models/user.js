const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  
    "email": {
        "type": String,
        "unique": true,
        "require": true
    }
});

userSchema.pre("save", function(next) {
    let user = this;
    next();
    // Generate a unique salt.
    // bcrypt.genSalt(10)
    // .then(salt => {
    //     // Hash the password using the salt.
    //     bcrypt.hash(user.email, salt)
    //     .then(hashedPwd => {
    //         // Password was hashed.
    //         // Update the user model and save to the database.
    //         user.email = hashedPwd;
    //         next();
    //     })
    //     .catch(err => {
    //         console.log(`Error occurred when hashing ... ${err}`);    
    //     })
    // })
    // .catch(err => {
    //     console.log(`Error occurred when salting ... ${err}`);
    // })
});

const userModel = mongoose.model("users", userSchema);

module.exports = user = userModel;