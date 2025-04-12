//router
const routes = require("express").Router()
const reviewController = require("../controllers/ReviewController")
routes.get("/getallreviews",reviewController.getReview)
routes.post("/addreview",reviewController.addReview)


module.exports = routes