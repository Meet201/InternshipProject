const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({


    firstName: {
        type: String
    },
    lastName: {
        type: String,

    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    contactNum: {
        type: String,
    },
    status: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    }
   

})

module.exports = mongoose.model("users", userSchema)