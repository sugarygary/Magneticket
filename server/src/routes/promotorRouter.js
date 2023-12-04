const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  createEvent, verifyPromotorCookie, createEventMulter, getEventTicket, getSingleEventTicket, getAllEvents, getSingleEvent, getKategoriEvent
} = require("../controllers/promotorController");
const expressAsyncHandler = require("express-async-handler");

const promotorRouter = express.Router();
promotorRouter.use(verifyPromotorCookie);

promotorRouter.post("/create-event", 
[createEventMulter],
expressAsyncHandler(createEvent));

promotorRouter.get("/event-ticket",expressAsyncHandler(getEventTicket));
promotorRouter.get("/event-ticket/:id",expressAsyncHandler(getSingleEventTicket));
promotorRouter.get("/allEvent",expressAsyncHandler(getAllEvents));
promotorRouter.get("/allEvent/:id",expressAsyncHandler(getSingleEvent));
promotorRouter.get("/allEvent/:id/kategori",expressAsyncHandler(getKategoriEvent));
module.exports = promotorRouter;
