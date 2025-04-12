const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors())
app.use(express.json()) //to accept data as json...

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const stateRoutes = require("./src/routes/StateRoute")
app.use("/state",stateRoutes)

const featureRoutes = require("./src/routes/FeatureRoutes")
app.use("/feature",featureRoutes)

const inquiryRoutes = require("./src/routes/InquiryRoutes")
app.use("/inquiry",inquiryRoutes)

const insuranceRoutes = require("./src/routes/InsuranceRoutes")
app.use("/insurance",insuranceRoutes)

const carRoutes = require("./src/routes/CarRoutes")
app.use("/car",carRoutes)

const reviewRoutes = require("./src/routes/ReviewRoutes")
app.use("/review",reviewRoutes)

const otpRoutes = require("./src/routes/OtpRoutes")
app.use("/otp",otpRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/vehicle_vault").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})