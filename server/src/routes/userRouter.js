const express = require("express");
const {
  verifyUserCookie,
  createTicket,
  getSeatsInfo,
  findMenuByScreening,
  findPromoByScreening,
  getHistory,
  getDetailHistory,
  createTicketReal,
} = require("../controllers/userController");
const expressAsyncHandler = require("express-async-handler");
const userRouter = express.Router();
userRouter.use(verifyUserCookie);
userRouter.post("/create-transaction", expressAsyncHandler(createTicket));
userRouter.post("/create-ticket", expressAsyncHandler(createTicketReal));

userRouter.get(
  "/screening/:screening_id/seat-info",
  expressAsyncHandler(getSeatsInfo)
);
userRouter.get(
  "/screening/:screening_id/menu",
  expressAsyncHandler(findMenuByScreening)
);

userRouter.get(
  "/screening/:screening_id/promotion",
  expressAsyncHandler(findPromoByScreening)
);

userRouter.get("/history", expressAsyncHandler(getHistory));

userRouter.get("/history/:history_id", expressAsyncHandler(getDetailHistory));
module.exports = userRouter;
