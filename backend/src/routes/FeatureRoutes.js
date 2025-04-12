//router
const routes = require("express").Router()
const featureController = require("../controllers/FeatureController")
routes.get("/getallfeature",featureController.getFeature)
routes.post("/addfeature",featureController.addFeature)


module.exports = routes