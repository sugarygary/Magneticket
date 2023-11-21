const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  verifyCineplexCookie,
  createBranch,
  createPromo,
  createMenu,
} = require("../controllers/cineplexController");
const expressAsyncHandler = require("express-async-handler");

const promotorRouter = express.Router();
promotorRouter.use(verifyCineplexCookie);

promotorRouter.post("/create-branch", expressAsyncHandler(createBranch));
promotorRouter.post("/create-promo", createPromo);
promotorRouter.post("/create-menu", createMenu); // ngaco
module.exports = promotorRouter;
