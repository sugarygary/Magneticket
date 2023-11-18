const express = require("express");
const { body, validationResult } = require("express-validator");
const {
    verifyCineplex,

} = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/verify-cineplex/:email", verifyCineplex);
module.exports = adminRouter;