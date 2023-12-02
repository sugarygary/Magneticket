require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (res, userId, role, email, display_name) => {
  const token = jwt.sign(
    { userId, role, email, display_name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
  res.cookie("magneticket_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "development" ? null : true,
    sameSite: process.env.NODE_ENV == "development" ? null : "none",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
