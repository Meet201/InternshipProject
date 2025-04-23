// const mongoose = require("mongoose")
// const Schema = mongoose.Schema

// const carSchema = new Schema({
//     make: {
//         type: String,
//     },
//     model: {
//         type: String,
//     },
//     year: {
//         type: Number,
//     },
//     variant: {
//         type: String,
//     },

//     mileage: {
//         type: Number,
//     },

//     fuelType: {
//         type: String,
//     },


//     transmissionType: {
//         type: String,
//     },
//     price: {
//         type: Number,
//     }, color: {
//         type: String,
//     },

//     description: {
//         type: String,
//     },

//     status: {
//         type: String,
//     },


//     listingDate: {
//         type: Date,
//     }, registrationNum: {
//         type: String,
//     }, userId: {
//         type: Schema.Types.ObjectId,
//         ref: "user",
//     }, cityId: {
//         type: Schema.Types.ObjectId,
//         ref: "city",
//     },

//     areaId: {
//         type: Schema.Types.ObjectId,
//         ref: "area",
//     },

//     stateId: {
//         type: Schema.Types.ObjectId,
//         ref: "state",
//     }, registrationYear: {
//         type: Number,
//     },


//     insurance: {
//         type: String,
//     },

//     seats: {
//         type: Number,
//     },


//     kmsDriven: {
//         type: Number,
//     },



//     OwnerShip: {
//         type: String,
//     },


//     engineDisplacement: {
//         type: String,
//     },


//     NoOfAirBags: {
//         type: Number,
//     }
// })

// module.exports = mongoose.model("car", carSchema)
// E:\vault\backend\src\models\CarModel.js
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  fuel: { type: String, required: true },
  mileage: { type: String, required: true },
  engine: { type: String, required: true },
  transmission: { type: String, required: true },
  year: { type: Number, required: true },
  brand: { type: String, required: true },
  status: { type: String, required: true, enum: ["new", "used"] },
  verified: { type: Boolean, required: true },
  dealer: { type: String },
  owner: { type: String }, // Optional
  location: { type: String }, // Optional
  kmsDriven: { type: Number } // Optional
});
module.exports = mongoose.model("Car", carSchema);