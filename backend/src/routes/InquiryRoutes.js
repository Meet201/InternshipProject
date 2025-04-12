//router
const routes = require("express").Router()
const inquiryController = require("../controllers/InquiryController")
routes.get("/getallinquiry",inquiryController.getInquiry)
routes.post("/addinquiry",inquiryController.addInquiry)


module.exports = routes