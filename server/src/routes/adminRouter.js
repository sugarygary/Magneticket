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
  getEvents,
  getSingleEvent,
  verifyEvent,
  deleteEvent,
  getMovieTransactions,
  getEventTransactions
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
adminRouter.post(
  "/verify-event/:event_id",
  expressAsyncHandler(verifyEvent)
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
  "/list-events",
  expressAsyncHandler(getEvents)
)
adminRouter.get(
  "/cineplex/:cineplexId",
  expressAsyncHandler(getSingleCineplex)
)
adminRouter.get(
  "/promotor/:promotorId",
  expressAsyncHandler(getSinglePromotor)
)
adminRouter.get(
  "/event/:eventId",
  expressAsyncHandler(getSingleEvent)
)
adminRouter.delete(
  "/delete-cineplex/:email",
  expressAsyncHandler(deleteCineplex)
)
adminRouter.delete(
  "/delete-promotor/:email",
  expressAsyncHandler(deletePromotor)
)
adminRouter.delete(
  "/delete-event/:eventId",
  expressAsyncHandler(deleteEvent)
)
adminRouter.get(
  "/movie-transactions",
  expressAsyncHandler(getMovieTransactions)
)
adminRouter.get(
  "/event-transactions",
  expressAsyncHandler(getEventTransactions)
)
module.exports = adminRouter;
