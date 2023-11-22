const express = require("express");
const {
  getNowShowingMovie,
  getScreeningByBranch,
  getScreeningByMovie,
  getMovieDetails,
} = require("../controllers/publicController");
const publicRouter = express.Router();
publicRouter.get("/now-showing", getNowShowingMovie);
publicRouter.get("/screenings-by-branch/:branch_id", getScreeningByBranch);
publicRouter.get("/screenings-by-movie/:movie_id", getScreeningByMovie);
publicRouter.get("/movie-details/:movie_id", getMovieDetails);

module.exports = publicRouter;
