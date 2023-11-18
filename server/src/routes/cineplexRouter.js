const express = require("express");
const { body, validationResult } = require("express-validator");
const { verifyCineplexCookie, createBranch } = require("../controllers/cineplexController");
const cineplexRouter = express.Router();

cineplexRouter.use(verifyCineplexCookie)

cineplexRouter.post("/create-branch", createBranch);
// adminRouter.post("/verify-cineplex/:email", verifyCineplex);
module.exports = cineplexRouter;