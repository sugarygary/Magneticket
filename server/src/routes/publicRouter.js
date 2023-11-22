const express = require("express");
const {
  getNowShowingMovie,
  getScreeningByBranch,
  getScreeningByMovie,
} = require("../controllers/publicController");
const publicRouter = express.Router();
publicRouter.get("/now-showing", getNowShowingMovie);
publicRouter.get("/screenings-by-branch/:branch_id", getScreeningByBranch);
publicRouter.get("/screenings-by-movie/:movie_id", getScreeningByMovie);

module.exports = publicRouter;
