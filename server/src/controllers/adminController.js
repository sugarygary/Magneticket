require("dotenv").config();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");
const Cineplex = require("../models/Cineplex");
const Promotor = require("../models/Promotor");

const verifyCineplex = async function (req, res) {
  let findCineplex = await Cineplex.findByEmail(req.params.email);
  if (findCineplex == null) {
    return res.status(404).send({ message: "Email Cineplex not found" });
  }
  await findCineplex.verify();
  res.status(200).send({ message: "VERIFIED HEHE" });
};

const verifyPromotor = async function (req, res) {
  let findPromotor = await Promotor.findByEmail(req.params.email);
  if (findPromotor == null) {
    return res.status(404).send({ message: "Email Promotor not found" });
  }
  await findPromotor.verify();
  res.status(200).send({ message: "VERIFIED HEHE" });
};

module.exports = {
  verifyCineplex,
  verifyPromotor,
};