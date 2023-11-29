const express = require("express");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const cineplexRouter = require("./cineplexRouter");
const publicRouter = require("./publicRouter");
const userRouter = require("./userRouter");
const promotorRouter = require("./promotorRouter");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/cineplex", cineplexRouter);
router.use("/admin", adminRouter);
router.use("/public", publicRouter);
router.use("/user", userRouter); 
router.use("/promotor", promotorRouter);

module.exports = router;
