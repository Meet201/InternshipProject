const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  /*createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 
  },*/
  expiresAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('OTP', otpSchema);