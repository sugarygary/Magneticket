const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  registerUser,
  activateUser,
  validateRegister,
  validateLogin,
  loginUser,
  logout,

  registerCineplex,
  validateRegisterCineplex,
  activateCineplex,
  loginCineplex,

  registerPromotor,
  validateRegisterPromotor,
  activatePromotor,
  loginPromotor,
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.get("/activate-user/:user_id", activateUser);
authRouter.post("/register-user", validateRegister, registerUser);
authRouter.post("/login-user", validateLogin, loginUser);
authRouter.get("/logout", logout);

authRouter.post("/register-cineplex", validateRegisterCineplex, registerCineplex);
authRouter.post("/login-cineplex", validateLogin, loginCineplex);
authRouter.get("/activate-cineplex/:cineplex_id",
  activateCineplex);

authRouter.post("/register-promotor", validateRegisterPromotor, registerPromotor);
authRouter.post("/login-promotor", validateLogin, loginPromotor);
authRouter.get("/activate-promotor/:promotor_id", activatePromotor),

  module.exports = authRouter;
