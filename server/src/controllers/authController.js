require("dotenv").config();
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { GMAIL_ACC, GMAIL_APP_PASSWORD, BACKEND_URL, FRONTEND_URL } =
  process.env;
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");

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

const registerUser = asyncHandler(async function (req, res) {
  const errors = validationResult(req);
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
});

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
];

const loginUser = asyncHandler(async function (req, res) {
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
});

const logout = asyncHandler(async function (req, res) {
  res.cookie("magneticket_token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "none",
  });
  res.status(200);
  return res.send({ message: "Logout success" });
});

const activateUser = asyncHandler(async function (req, res) {
  let findUser = await User.findById(req.params.user_id);
  if (findUser == null) {
    return res.status(404).send({ message: "Invalid Code" });
  }
  await findUser.activate();
  res.status(301).redirect(FRONTEND_URL);
});

module.exports = {
  registerUser,
  loginUser,
  validateLogin,
  activateUser,
  validateRegister,
  logout,
};
