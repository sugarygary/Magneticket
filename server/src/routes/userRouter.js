const express = require("express");
const {
  verifyUserCookie,
  createTicket,
  getSeatsInfo,
  findMenuByScreening,
  findPromoByScreening,
  getHistory,
  getDetailHistory
} = require("../controllers/userController");
const expressAsyncHandler = require("express-async-handler");
const userRouter = express.Router();
userRouter.use(verifyUserCookie);
userRouter.post("/create-ticket", expressAsyncHandler(createTicket));

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

userRouter.get(
  "/history",
  expressAsyncHandler(getHistory)
)

userRouter.get(
  "/history/:history_id",
  expressAsyncHandler(getDetailHistory)
)
module.exports = userRouter;
