const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  verifyCineplex,
  verifyPromotor,
  getCineplexs,
  deleteCineplex,
  getSingleCineplex,
  getPromotors,
  getSinglePromotor,
  deletePromotor,
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
adminRouter.get(
  "/list-cineplexs",
  expressAsyncHandler(getCineplexs)
)
adminRouter.get(
  "/list-promotors",
  expressAsyncHandler(getPromotors)
)
adminRouter.get(
  "/cineplex/:cineplexId",
  expressAsyncHandler(getSingleCineplex)
)
adminRouter.get(
  "/promotor/:promotorId",
  expressAsyncHandler(getSinglePromotor)
)
adminRouter.delete(
  "/delete-cineplex/:email",
  expressAsyncHandler(deleteCineplex)
)
adminRouter.delete(
  "/delete-promotor/:email",
  expressAsyncHandler(deletePromotor)
)
module.exports = adminRouter;
