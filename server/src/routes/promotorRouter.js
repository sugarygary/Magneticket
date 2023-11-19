const express = require("express");
const { body, validationResult } = require("express-validator");
const { verifyCineplexCookie, createBranch, createPromo, createMenu } = require("../controllers/cineplexController");

const promotorRouter = express.Router();
promotorRouter.use(verifyCineplexCookie)

promotorRouter.post("/create-branch", createBranch);
promotorRouter.post("/create-promo", createPromo);
promotorRouter.post("/create-menu", createMenu);
// adminRouter.post("/verify-cineplex/:email", verifyCineplex);
module.exports = promotorRouter;