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
} = require("../controllers/publicController");
const publicRouter = express.Router();
publicRouter.get("/now-showing", getNowShowingMovie);
publicRouter.get("/branches", getBranch);
publicRouter.get("/cineplexes", getCineplex);
publicRouter.get("/screenings-by-branch/:branch_id", getScreeningByBranch);
publicRouter.get("/screenings-by-movie/:movie_id", getScreeningByMovie);
publicRouter.get("/movie-details/:movie_id", getMovieDetails);
publicRouter.get("/ongoing-event", getOngoingEvent);
publicRouter.get("/event-details/:event_id", getSingleEvent);
publicRouter.get("/event-category/:event_id", getSingleEventCategory);

module.exports = publicRouter;
