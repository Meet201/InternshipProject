const express = require("express");
     const mongoose = require("mongoose");
     const cors = require("cors");
     const jwt = require("jsonwebtoken");

     require("dotenv").config();

     const app = express();
     app.use(cors());
     app.use(express.json());

     // JWT Middleware
     const authenticateToken = (req, res, next) => {
       const token = req.headers["authorization"]?.split(" ")[1];
       if (!token) return res.status(401).json({ error: true, message: "Unauthorized" });
       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
         if (err) return res.status(403).json({ error: true, message: "Invalid or expired token" });
         req.user = user;
         next();
       });
     };

     // Routes
     const userRoutes = require("./src/routes/UserRoutes");
     app.use("/user", userRoutes);

     const areaRoutes = require("./src/routes/AreaRoutes");
     app.use("/area", areaRoutes);

     const cityRoutes = require("./src/routes/CityRoutes");
     app.use("/city", cityRoutes);

     const stateRoutes = require("./src/routes/StateRoute");
     app.use("/state", stateRoutes);

     const featureRoutes = require("./src/routes/FeatureRoutes");
     app.use("/feature", featureRoutes);

     const inquiryRoutes = require("./src/routes/InquiryRoutes");
     app.use("/inquiry", inquiryRoutes);

     const insuranceRoutes = require("./src/routes/InsuranceRoutes");
     app.use("/insurance", insuranceRoutes);

     const carRoutes = require("./src/routes/CarRoutes");
     app.use("/car", carRoutes);

     const reviewRoutes = require("./src/routes/ReviewRoutes");
     app.use("/review", reviewRoutes);

     const otpRoutes = require("./src/routes/OtpRoutes");
     app.use("/otp", otpRoutes);

     const contactRoutes = require("./src/routes/ContactRoutes");
     app.use("/contact", contactRoutes);

     const paymentRoutes = require("./src/routes/PaymentRoutes");
     app.use("/payment", paymentRoutes);

     // MongoDB Connection
     mongoose
       .connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       })
       .then(() => console.log("database connected...."))
       .catch((err) => console.error("MongoDB connection error:", err));

     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
       console.log(`server started on port number ${PORT}`);
     });