const UserModel = require('../models/UserModel');
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

const userSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, gender, contactNum, status, password, confirmPassword } = req.body;

        if (!firstName || !lastName || !email || !gender || !contactNum || !status || !password || !confirmPassword) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: true, message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            gender,
            contactNum,
            status,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });

        await newUser.save();


        return res.status(201).json({
            error: false,
            message: "Signup successful",

        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server error", details: error.message });
    }
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ error: true, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ error: true, message: "Invalid email" });
    }

    // Ensure that createPassword is defined
    const storedPassword = user.password;

    if (!storedPassword) {
        return res.json({ error: true, message: "No password found in database" });
    }

    const match = await bcrypt.compare(password, storedPassword);

    if (!match) {
        return res.json({ error: true, message: "Invalid password" });
    }


    return res.status(200).json({
        error: false,
        message: "Login successful",

    });
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const foundUser = await userModel.findOne({ email: email });
  
    if (foundUser) {
      const token = jwt.sign(foundUser.toObject(), secret);
      console.log(token);
      const url = `http://localhost:5173/resetpassword/${token}`;
      const mailContent = `<html>
                            <a href ="${url}">rest password</a>
                            </html>`;
      //email...
      await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
      res.json({
        message: "reset password link sent to mail.",
      });
    } else {
      res.json({
        message: "user not found register first..",
      });
    }
};

const resetpassword = async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    const userFromToken = jwt.verify(token, secret);
    //object -->email,id..
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPasseord = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
        password: hashedPasseord,
    });
    res.json({
        message: "password updated successfully..",
    });
};

module.exports = {
    userLogin,
    userSignup,
    forgotPassword,
    resetpassword
}