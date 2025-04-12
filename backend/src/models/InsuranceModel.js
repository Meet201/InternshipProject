const mongoose = require("mongoose")
const Schema = mongoose.Schema

const insuranceSchema = new Schema({

    insuranceType:{
        type:String,
    },
   
})

module.exports = mongoose.model("insurance",insuranceSchema)