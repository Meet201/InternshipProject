const mongoose = require("mongoose")
const Schema = mongoose.Schema

const inquirySchema = new Schema({

    carId: {
        type: Schema.Types.ObjectId,
        ref: "Car",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
    },
    status: {
        type: String,
    }
}, {

    timestamps: true,

})

module.exports = mongoose.model("inquiry", inquirySchema)


