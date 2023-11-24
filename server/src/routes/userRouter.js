const express = require("express");
const {
  verifyUserCookie,
  createTicket,
  getSeatsInfo,
} = require("../controllers/userController");
const expressAsyncHandler = require("express-async-handler");
const userRouter = express.Router();
userRouter.use(verifyUserCookie);
userRouter.post("/create-ticket", expressAsyncHandler(createTicket));

userRouter.get(
  "/screening/:screening_id/seat-info",
  expressAsyncHandler(getSeatsInfo)
);
module.exports = userRouter;