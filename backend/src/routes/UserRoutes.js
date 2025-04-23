const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/forgotpassword", userController.forgotPassword);
router.post("/resetpassword", userController.resetPassword);
router.get("/me", authMiddleware, userController.getUser);

module.exports = router;