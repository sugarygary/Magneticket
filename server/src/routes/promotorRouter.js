const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  createEvent, verifyPromotorCookie, createEventMulter
} = require("../controllers/promotorController");
const expressAsyncHandler = require("express-async-handler");

const promotorRouter = express.Router();
promotorRouter.use(verifyPromotorCookie);

promotorRouter.post("/create-event", 
[createEventMulter],
expressAsyncHandler(createEvent));
module.exports = promotorRouter;
