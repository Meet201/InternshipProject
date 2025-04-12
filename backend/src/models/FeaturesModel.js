const mongoose = require("mongoose")
const Schema = mongoose.Schema

const featureSchema = new Schema({

    featureName:{
        type:String,
    },
   
})

module.exports = mongoose.model("feature",featureSchema)