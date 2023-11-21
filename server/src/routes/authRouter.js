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
const expressAsyncHandler = require("express-async-handler");
const authRouter = express.Router();

authRouter.get("/activate-user/:user_id", expressAsyncHandler(activateUser));
authRouter.post(
  "/register-user",
  validateRegister,
  expressAsyncHandler(registerUser)
);
authRouter.post("/login-user", validateLogin, expressAsyncHandler(loginUser));
authRouter.get("/logout", logout);

authRouter.post(
  "/register-cineplex",
  validateRegisterCineplex,
  expressAsyncHandler(registerCineplex)
);
authRouter.post(
  "/login-cineplex",
  validateLogin,
  expressAsyncHandler(loginCineplex)
);
authRouter.get(
  "/activate-cineplex/:cineplex_id",
  expressAsyncHandler(activateCineplex)
);

authRouter.post(
  "/register-promotor",
  validateRegisterPromotor,
  expressAsyncHandler(registerPromotor)
);
authRouter.post(
  "/login-promotor",
  validateLogin,
  expressAsyncHandler(loginPromotor)
);
authRouter.get(
  "/activate-promotor/:promotor_id",
  expressAsyncHandler(activatePromotor)
);
module.exports = authRouter;
