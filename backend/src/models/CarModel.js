const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carSchema = new Schema({
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    year: {
        type: Number,
    },
    variant: {
        type: String,
    },

    mileage: {
        type: Number,
    },

    fuelType: {
        type: String,
    },


    transmissionType: {
        type: String,
    },
    price: {
        type: Number,
    }, color: {
        type: String,
    },

    description: {
        type: String,
    },

    status: {
        type: String,
    },


    listingDate: {
        type: Date,
    }, registrationNum: {
        type: String,
    }, userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }, cityId: {
        type: Schema.Types.ObjectId,
        ref: "city",
    },

    areaId: {
        type: Schema.Types.ObjectId,
        ref: "area",
    },

    stateId: {
        type: Schema.Types.ObjectId,
        ref: "state",
    }, registrationYear: {
        type: Number,
    },


    insurance: {
        type: String,
    },

    seats: {
        type: Number,
    },


    kmsDriven: {
        type: Number,
    },



    OwnerShip: {
        type: String,
    },


    engineDisplacement: {
        type: String,
    },


    NoOfAirBags: {
        type: Number,
    }
})

module.exports = mongoose.model("car", carSchema)