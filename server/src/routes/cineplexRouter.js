const express = require("express");
const { body, validationResult } = require("express-validator");
const { verifyCineplexCookie, createBranch, createPromo, createMenu } = require("../controllers/cineplexController");
const cineplexRouter = express.Router();
cineplexRouter.use(verifyCineplexCookie)

cineplexRouter.post("/create-branch", createBranch);
cineplexRouter.post("/create-promo", createPromo);
cineplexRouter.post("/create-menu", createMenu);
// adminRouter.post("/verify-cineplex/:email", verifyCineplex);
module.exports = cineplexRouter;