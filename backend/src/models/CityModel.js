const mongoose = require("mongoose")
const Schema = mongoose.Schema

const citySchema = new Schema({

    name:{
        type:String,
        required:true,
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"state"
    },
},{
    timestamps:true

})

module.exports = mongoose.model("city",citySchema)