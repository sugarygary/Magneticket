const express = require("express");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const cineplexRouter = require("./cineplexRouter");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/cineplex", cineplexRouter);
router.use("/admin", adminRouter);

module.exports = router;
