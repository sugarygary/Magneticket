require("dotenv").config();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");
const Cineplex = require("../models/Cineplex");
const Promotor = require("../models/Promotor");
const { GMAIL_ACC, GMAIL_APP_PASSWORD, BACKEND_URL, FRONTEND_URL } =
  process.env;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_ACC,
    pass: GMAIL_APP_PASSWORD,
  },
});
const verifyCineplex = async function (req, res) {
  console.log(req.params.email)
  let findCineplex = await Cineplex.findByEmail(req.params.email);
  if (findCineplex == null) {
    return res.status(404).send({ message: "Email Cineplex not found" });
  }
  await findCineplex.verify();
  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: findCineplex.email,
    subject: "Registration For Cineplex Account Has Verified",
    html: `
      Akun Anda sudah dapat digunakan
      `,
  });
    res
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
const getCineplexs = async (req, res) => {
  const cineplexs = await Cineplex.find({  });
  res.status(200).json({ cineplexs });  
};
const getPromotors = async (req, res) => {
  const promotors = await Promotor.find({  });
  res.status(200).json({ promotors });  
};
const deleteCineplex = async function (req, res) {
  console.log(req.params.email)
  console.log(req.body.alasan)
  try {
    const findCineplex = await Cineplex.findByEmail(req.params.email);
    if (!findCineplex) {
      return res.status(404).send({ message: "Email Cineplex not found" });
    }
    // Assuming you have a delete method in your Cineplex model
    await Cineplex.deleteByEmail(req.params.email);

  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: findCineplex.email,
    subject: "Registration For Cineplex Account Has Been Declined",
    html: `
      Maaf data diri anda tidak memenuhi ketentuan untuk mendaftar di Magneticket dengan alasan ${req.body.alasan}
      `,
  });
    res.status(200).send({ message: "Cineplex deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const getSingleCineplex = async (req, res) => {
  try {
    const cineplex = await Cineplex.findById(req.params.cineplexId);
    if (!cineplex) {
      return res.status(404).json({ message: "Cineplex not found" });
    }
    res.status(200).json({ cineplex });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSinglePromotor = async (req, res) => {
  try {
    const promotor = await Promotor.findById(req.params.promotorId);
    if (!promotor) {
      return res.status(404).json({ message: "Promotor not found" });
    }
    res.status(200).json({ promotor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deletePromotor = async function (req, res) {
  console.log(req.params.email)
  console.log(req.body.alasan)
  try {
    const findPromotor = await Promotor.findByEmail(req.params.email);
    if (!findPromotor) {
      return res.status(404).send({ message: "Email Promotor not found" });
    }
    // Assuming you have a delete method in your Cineplex model
    await Promotor.deleteByEmail(req.params.email);

  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: findPromotor.email,
    subject: "Registration For Promotor Account Has Been Declined",
    html: `
      Maaf data diri anda tidak memenuhi ketentuan untuk mendaftar di Magneticket dengan alasan ${req.body.alasan}
      `,
  });
    res.status(200).send({ message: "Promotor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = {
  verifyCineplex,
  verifyPromotor,
  getCineplexs,
  deleteCineplex,
  getSingleCineplex,
  getPromotors,
  getSinglePromotor,
  deletePromotor,
};
