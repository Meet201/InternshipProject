// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     firstName: { type: String },
//     lastName: { type: String },
//     email: { type: String, unique: true, required: true },
//     gender: { type: String },
//     contactNum: { type: String },
//     status: { type: String },
//     password: { type: String, required: true }
// });

// module.exports = mongoose.model("users", userSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  contactNum: { type: String, required: true },
  status: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);