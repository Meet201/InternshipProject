const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    carId: {
        type: Schema.Types.ObjectId,
        ref: "Car",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Car",
    },
    rating: {
        type: String,
    },
    reviewDate: {
        type: Date,
    },
    reviewText: {
        type: String,
    },
    anyExtraComment: {
        type: String,
    }
})

module.exports = mongoose.model("review", reviewSchema)