//router
const routes = require("express").Router()
const carController = require("../controllers/CarControllers")
routes.get("/getallcars",carController.getCar)
routes.post("/addcar",carController.addCar)


module.exports = routes