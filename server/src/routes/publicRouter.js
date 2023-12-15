const express = require("express");
const {
  getNowShowingMovie,
  getScreeningByBranch,
  getScreeningByMovie,
  getMovieDetails,
  getBranch,
  getCineplex,
  getOngoingEvent,
  getSingleEvent,
  getSingleEventCategory,
  getPresales,
  getAllEvent,
} = require("../controllers/publicController");
const expressAsyncHandler = require("express-async-handler");
const publicRouter = express.Router();
publicRouter.get("/now-showing", expressAsyncHandler(getNowShowingMovie));
publicRouter.get("/pre-sale", expressAsyncHandler(getPresales));
publicRouter.get("/branches", expressAsyncHandler(getBranch));
publicRouter.get("/cineplexes", expressAsyncHandler(getCineplex));
publicRouter.get(
  "/screenings-by-branch/:branch_id",
  expressAsyncHandler(getScreeningByBranch)
);
publicRouter.get(
  "/screenings-by-movie/:movie_id",
  expressAsyncHandler(getScreeningByMovie)
);
publicRouter.get(
  "/movie-details/:movie_id",
  expressAsyncHandler(getMovieDetails)
);
publicRouter.get("/ongoing-event", expressAsyncHandler(getOngoingEvent));
publicRouter.get(
  "/event-details/:event_id",
  expressAsyncHandler(getSingleEvent)
);
publicRouter.get(
  "/event-category/:event_id",
  expressAsyncHandler(getSingleEventCategory)
);
publicRouter.get("/now-showing", expressAsyncHandler(getNowShowingMovie));
publicRouter.get("/branches", expressAsyncHandler(getBranch));
publicRouter.get("/cineplexes", expressAsyncHandler(getCineplex));
publicRouter.get(
  "/screenings-by-branch/:branch_id",
  expressAsyncHandler(getScreeningByBranch)
);
publicRouter.get(
  "/screenings-by-movie/:movie_id",
  expressAsyncHandler(getScreeningByMovie)
);
publicRouter.get(
  "/movie-details/:movie_id",
  expressAsyncHandler(getMovieDetails)
);
publicRouter.get("/ongoing-event", expressAsyncHandler(getOngoingEvent));
publicRouter.get("/all-event", expressAsyncHandler(getAllEvent))

module.exports = publicRouter;
