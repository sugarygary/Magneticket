const express = require("express");
const {
  verifyCineplexCookie,
  createBranch,
  createPromo,
  createMenu,
  createStudio,
  validateCreateStudio,
  createScreening,
  validateCreateScreening,
  getBranch,
  getScreening,
  getPromo,
  getMenu,
  getStudio,
} = require("../controllers/cineplexController");
const expressAsyncHandler = require("express-async-handler");
const cineplexRouter = express.Router();
cineplexRouter.use(verifyCineplexCookie);
cineplexRouter.post("/create-branch", expressAsyncHandler(createBranch));
cineplexRouter.post(
  "/create-studio",
  validateCreateStudio,
  expressAsyncHandler(createStudio)
);
cineplexRouter.post(
  "/create-screening",
  validateCreateScreening,
  expressAsyncHandler(createScreening)
);
cineplexRouter.post("/create-promo", expressAsyncHandler(createPromo));
cineplexRouter.post("/create-menu", expressAsyncHandler(createMenu));
cineplexRouter.get("/branches/:cineplexId", expressAsyncHandler(getBranch));
cineplexRouter.get("/screenings/:cineplexId", expressAsyncHandler(getScreening));
cineplexRouter.get("/promos/:cineplexId", expressAsyncHandler(getPromo));
cineplexRouter.get("/menus/:cineplexId", expressAsyncHandler(getMenu));
cineplexRouter.get("/studios/:cineplexId", expressAsyncHandler(getStudio));

module.exports = cineplexRouter;
