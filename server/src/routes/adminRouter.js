const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  verifyCineplex,
  verifyPromotor,
} = require("../controllers/adminController");
const expressAsyncHandler = require("express-async-handler");
const adminRouter = express.Router();

adminRouter.post(
  "/verify-cineplex/:email",
  expressAsyncHandler(verifyCineplex)
);
adminRouter.post(
  "/verify-promotor/:email",
  expressAsyncHandler(verifyPromotor)
);
module.exports = adminRouter;
