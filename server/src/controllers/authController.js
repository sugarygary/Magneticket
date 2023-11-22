require("dotenv").config();
const User = require("../models/User");
const { GMAIL_ACC, GMAIL_APP_PASSWORD, BACKEND_URL, FRONTEND_URL } =
  process.env;
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");
const Cineplex = require("../models/Cineplex");
const Promotor = require("../models/Promotor");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_ACC,
    pass: GMAIL_APP_PASSWORD,
  },
});

const validateRegister = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
  body("full_name").notEmpty().withMessage("Field cannot be empty"),
];
const validateRegisterCineplex = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
  body("company_name").notEmpty().withMessage("Field cannot be empty"),
  body("brand_name").notEmpty().withMessage("Field cannot be empty"),
];

const registerUser = async function (req, res) {
  const errors = validationResult(req);
  console.log(req.body.full_name);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { email, password, full_name } = req.body;
  let findUser = await User.findOne({ email });
  if (findUser !== null) {
    res.status(409);
    throw new Error("Email already exists");
  }
  let newUser = new User({
    email: email,
    password: password,
    full_name: full_name,
  });
  await newUser.save();
  const link = `${BACKEND_URL}/api/auth/activate-user/${newUser._id.toString()}`;
  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: email,
    subject: "Activate Your Account",
    html: `
      Activate your account with the link below
      <br>
      <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                 <td>
                  <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td style="border-radius: 2px;" bgcolor="#1F2A37">
                          <a href="${link}" target="_blank" style="padding: 8px 12px; border: 1px solid #1F2A37; border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                              Activate Your Accunt
                          </a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>`,
  });
  return res.status(201).send({
    message: "User created, please verify email",
    _id: newUser._id.toString(),
    email: newUser.email,
    full_name: newUser.full_name,
    activated: newUser.activated,
  });
};

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
];

const loginUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const findUser = await User.findByEmail(email);
  if (findUser === null) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  let matchPassword = await findUser.comparePassword(password);
  if (!matchPassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (!findUser.activated) {
    res.status(403);
    throw new Error("Please activate your account");
  }
  generateToken(res, findUser._id.toString(), "USER");
  return res.status(200).send({
    message: "Login success",
    _id: findUser._id.toString(),
    email: findUser.email,
    full_name: findUser.full_name,
    activated: findUser.activated,
  });
};

const currentUser = async function (req, res) {
  const token = req.cookies.magneticket_token;
  if (!token) {
    return res.status(204).send(null);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return res.status(200).send({ userId: verified.userId, role: verified.role });
};

const logout = async function (req, res) {
  res.clearCookie("magneticket_token");
  res.status(200);
  return res.send({ message: "Logout success" });
};

const activateUser = async function (req, res) {
  let findUser = await User.findById(req.params.user_id);
  if (findUser == null) {
    return res.status(404).send({ message: "Invalid Code" });
  }
  await findUser.activate();
  res.status(301).redirect(FRONTEND_URL);
};

//#region bioskop
const registerCineplex = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { email, password, company_name, brand_name } = req.body;
  let findCineplex = await Cineplex.findByEmail(email);
  if (findCineplex !== null) {
    res.status(409);
    throw new Error("Email already exists");
  }
  let newCineplex = new Cineplex({
    email: email,
    password: password,
    company_name: company_name,
    brand_name: brand_name,
  });
  await newCineplex.save();
  const link = `${BACKEND_URL}/api/auth/activate-cineplex/${newCineplex._id.toString()}`;
  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: email,
    subject: "Activate Your Account",
    html: `
      Activate your account with the link below
      <br>
      <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                 <td>
                  <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td style="border-radius: 2px;" bgcolor="#1F2A37">
                          <a href="${link}" target="_blank" style="padding: 8px 12px; border: 1px solid #1F2A37; border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                              Activate Your Accunt
                          </a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>`,
  });
  return res.status(201).send({
    message: "Cineplex created, please verify email",
    _id: newCineplex._id.toString(),
    email: newCineplex.email,
    company_name: newCineplex.company_name,
    brand_name: newCineplex.brand_name,
    activated: newCineplex.activated,
    verified: newCineplex.verified,
  });
};
const activateCineplex = async function (req, res) {
  let findCineplex = await Cineplex.findById(req.params.cineplex_id);
  if (findCineplex == null) {
    return res.status(404).send({ message: "Invalid Code" });
  }
  await findCineplex.activate();
  res.status(301).redirect(FRONTEND_URL);
};
const loginCineplex = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const findCineplex = await Cineplex.findByEmail(email);
  if (findCineplex === null) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  let matchPassword = await findCineplex.comparePassword(password);
  if (!matchPassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (!findCineplex.activated) {
    res.status(403);
    throw new Error("Please activate your account");
  }
  if (!findCineplex.verified) {
    res.status(403);
    throw new Error("Please wait for the verification for your account :)");
  }
  generateToken(res, findCineplex._id.toString(), "CINEPLEX");
  return res.status(200).send({
    message: "Login success",
    _id: findCineplex._id.toString(),
    email: findCineplex.email,
    company_name: findCineplex.company_name,
    brand_name: findCineplex.brand_name,
    activated: findCineplex.activated,
    verified: findCineplex.verified,
  });
};

//#endregion

//#region promotor
const registerPromotor = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { email, password, company_name, brand_name } = req.body;
  let findPromotor = await Promotor.findByEmail(email);
  if (findPromotor !== null) {
    res.status(409);
    throw new Error("Email already exists");
  }
  let newPromotor = new Promotor({
    email: email,
    password: password,
    company_name: company_name,
    brand_name: brand_name,
  });
  await newPromotor.save();
  const link = `${BACKEND_URL}/api/auth/activate-promotor/${newPromotor._id.toString()}`;
  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: email,
    subject: "Activate Your Account",
    html: `
      Activate your account with the link below
      <br>
      <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                 <td>
                  <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td style="border-radius: 2px;" bgcolor="#1F2A37">
                          <a href="${link}" target="_blank" style="padding: 8px 12px; border: 1px solid #1F2A37; border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                              Activate Your Accunt
                          </a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>`,
  });
  return res.status(201).send({
    message: "Promotor created, please verify email",
    _id: newPromotor._id.toString(),
    email: newPromotor.email,
    company_name: newPromotor.company_name,
    brand_name: newPromotor.brand_name,
    activated: newPromotor.activated,
    verified: newPromotor.verified,
  });
};
const activatePromotor = async function (req, res) {
  let findPromotor = await Promotor.findById(req.params.promotor_id);
  if (findPromotor == null) {
    return res.status(404).send({ message: "Invalid Code" });
  }
  await findPromotor.activate();
  res.status(301).redirect(FRONTEND_URL);
};
const loginPromotor = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const findPromotor = await Promotor.findByEmail(email);
  if (findPromotor === null) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  let matchPassword = await findPromotor.comparePassword(password);
  if (!matchPassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (!findPromotor.activated) {
    res.status(403);
    throw new Error("Please activate your account");
  }
  if (!findPromotor.verified) {
    res.status(403);
    throw new Error("Please wait for the verification for your account :)");
  }
  generateToken(res, findPromotor._id.toString(), "PROMOTOR");
  return res.status(200).send({
    message: "Login success",
    _id: findPromotor._id.toString(),
    email: findPromotor.email,
    company_name: findPromotor.company_name,
    brand_name: findPromotor.brand_name,
    activated: findPromotor.activated,
    verified: findPromotor.verified,
  });
};
const validateRegisterPromotor = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
  body("company_name").notEmpty().withMessage("Field cannot be empty"),
  body("brand_name").notEmpty().withMessage("Field cannot be empty"),
];
//#endregion
module.exports = {
  registerUser,
  loginUser,
  validateLogin,
  activateUser,
  validateRegister,
  logout,
  registerCineplex,
  loginCineplex,
  validateRegisterCineplex,
  activateCineplex,
  validateRegisterPromotor,
  registerPromotor,
  activatePromotor,
  loginPromotor,
  currentUser,
};
