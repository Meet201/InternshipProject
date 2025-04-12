//router
const routes = require("express").Router()
const areaController = require("../controllers/AreaController")
routes.get("/getarea",areaController.getArea)
routes.post("/add",areaController.addArea)


module.exports = routes