//router
const routes = require("express").Router()
const stateController = require("../controllers/StateController")
routes.get("/getallstates",stateController.getState)
routes.post("/addstate",stateController.addState)


module.exports = routes