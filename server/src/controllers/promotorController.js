require("dotenv").config();
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { GMAIL_ACC, GMAIL_APP_PASSWORD, BACKEND_URL, FRONTEND_URL } =
  process.env;
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");
const Cineplex = require("../models/Cineplex");
const jwt = require("jsonwebtoken");
const Branch = require("../models/Branch");
const { ObjectId } = require("mongodb");
const Promotion = require("../models/Promotion");
const Menu = require("../models/Menu");

const verifyPromotorCookie = async (req, res, next) => {
  try {
    const token = req.cookies.magneticket_token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized kalo tidak ada cookie aktif" });
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.role != "PROMOTOR") {
      return res
        .status(403)
        .json({ message: "Forbidden BUKAN AKUN AKUN PROMOTOR HEHEH" });
    }
    req.userId = verified.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  verifyPromotorCookie,
};
