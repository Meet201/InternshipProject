//router
const routes = require("express").Router()
const insuranceController = require("../controllers/InsuranceController")
routes.get("/getallinsurance",insuranceController.getInsurance)
routes.post("/addinsurance",insuranceController.addInsurance)


module.exports = routes