const express = require("express");
const { body, validationResult } = require("express-validator");
const {
    verifyCineplex,
    verifyPromotor
} = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/verify-cineplex/:email", verifyCineplex);
adminRouter.post("/verify-promotor/:email", verifyPromotor);
module.exports = adminRouter;