const express = require("express");
const {
  getNowShowingMovie,
  getScreeningByBranch,
  getScreeningByMovie,
  getMovieDetails,
  getBranch,
  getCineplex,
} = require("../controllers/publicController");
const publicRouter = express.Router();
publicRouter.get("/now-showing", getNowShowingMovie);
publicRouter.get("/branches", getBranch);
publicRouter.get("/cineplexes", getCineplex);
publicRouter.get("/screenings-by-branch/:branch_id", getScreeningByBranch);
publicRouter.get("/screenings-by-movie/:movie_id", getScreeningByMovie);
publicRouter.get("/movie-details/:movie_id", getMovieDetails);

module.exports = publicRouter;
