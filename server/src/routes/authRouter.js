const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  registerUser,
  activateUser,
  validateRegister,
  validateLogin,
  loginUser,
  logout,
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.get("/activate-user/:user_id", activateUser);
authRouter.post("/register-user", validateRegister, registerUser);
authRouter.post("/login-user", validateLogin, loginUser);
authRouter.get("/logout", logout);

module.exports = authRouter;
