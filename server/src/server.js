require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/Router");
const { db, getDBStatus } = require("./db/connection");
const User = require("./models/User");
const init = require("./db/init");

server.use(
  cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 })
);
server.use("/", router);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

getDBStatus();
// const newUser = new User({
//   email: "abcd@gmail.com",
//   password: "abc",
//   activation_code: "LewatSini",
//   full_name: "Gary",
// });
// newUser.save();

server.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to Magneticket Server!" });
});
init();

server.listen(PORT, async () => {
  console.log(`Server running on port http://${HOSTNAME}:${PORT}/`);
  // console.log((await User.find())[0].id);
});
