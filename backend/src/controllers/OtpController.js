const crypto = require('crypto');
const User = require('../models/UserModel');
const OTP = require('../models/OTPModel');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_KEY
  }
});

// Generate a secure 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random()*900000).toString();
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is required");

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to database
    await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 15 * 60 * 1000) });

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 15 minutes.`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:",error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({error: true,message: "Email and OTP are required"});
    }

    // Find latest valid OTP
    const otpRecord = await OTP.findOne({
      email,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({error: true,message: "OTP expired or not found"});
    }

    // Correct the OTP validation logic
    if (otpRecord.otp !== otp) {
      return res.status(400).json({error: true,message: "Invalid OTP"});
    }

    // Mark OTP as used
    otpRecord.used = true;
    await otpRecord.save();

    return res.status(200).json({error: false,message: "OTP verified successfully"});
  } catch (error) {
    return res.status(500).json({error: true,message: "Server error",details: error.message});
  }
};

module.exports = {
  sendOTP,
  verifyOTP
};