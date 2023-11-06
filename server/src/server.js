require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/Router");
const dbo = require("./db/connection");

server.use(
  cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 })
);
server.use("/", router);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to Magneticket Server!" });
});

server.listen(PORT, () => {
  // perform a database connection when server starts
  // dbo.connectToServer(function (err) {
  //   if (err) console.error(err);
  // });
  console.log(`Server running on port http://${HOSTNAME}:${PORT}/`);
});
