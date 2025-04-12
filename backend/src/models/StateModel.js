const mongoose = require("mongoose")
const Schema = mongoose.Schema

const stateSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
},{
    timestamps:true

})

module.exports = mongoose.model("state",stateSchema)