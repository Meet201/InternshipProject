//router
const routes = require("express").Router()
const cityController = require("../controllers/CityController")
routes.get("/getallcities",cityController.getCity)
routes.post("/addcity",cityController.addCity)


module.exports = routes