const express = require("express");

const {
  verifyCineplexCookie,
  createBranch,
  createPromo,
  createMenu,
  registerMenuMulter,
  createStudio,
  validateCreateStudio,
  createScreening,
  validateCreateScreening,
  getBranch,
  getScreening,
  getPromo,
  getMenu,
  getStudio,
  getStudioAll,
  deletePromo,
  getSingleMenu,
  editMenu,
  getMovieTicket,
  getSingleMovieTicket,
  getScreeningLengkap
} = require("../controllers/cineplexController");
const expressAsyncHandler = require("express-async-handler");
const cineplexRouter = express.Router();
cineplexRouter.use(verifyCineplexCookie);
cineplexRouter.post("/create-branch", expressAsyncHandler(createBranch));
cineplexRouter.post(
  "/studios/create-studio",
  validateCreateStudio,
  expressAsyncHandler(createStudio)
);
cineplexRouter.post(
  "/create-screening",
  validateCreateScreening,
  expressAsyncHandler(createScreening)
);
cineplexRouter.post("/create-promo", expressAsyncHandler(createPromo));
cineplexRouter.post("/create-menu",[registerMenuMulter] ,expressAsyncHandler(createMenu));
cineplexRouter.get("/branches", expressAsyncHandler(getBranch));
cineplexRouter.get("/screenings", expressAsyncHandler(getScreening));
cineplexRouter.get("/screenings-lengkap", expressAsyncHandler(getScreeningLengkap));
cineplexRouter.get("/promos", expressAsyncHandler(getPromo));
cineplexRouter.get("/menus", expressAsyncHandler(getMenu));
cineplexRouter.get("/studios", expressAsyncHandler(getStudioAll));
cineplexRouter.get("/studios/:branchId", expressAsyncHandler(getStudio));
cineplexRouter.post("/delete-promo/:id", expressAsyncHandler(deletePromo));
cineplexRouter.get("/menus/:id", expressAsyncHandler(getSingleMenu));
cineplexRouter.post("/edit-menu/:id", expressAsyncHandler(editMenu));
cineplexRouter.get("/movie-ticket",expressAsyncHandler(getMovieTicket));
cineplexRouter.get("/movie-ticket/:id",expressAsyncHandler(getSingleMovieTicket));

module.exports = cineplexRouter;
