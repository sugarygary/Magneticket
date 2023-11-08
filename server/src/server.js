require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/Router");
const { db, getDBStatus } = require("./db/connection");
const User = require("./models/dummyModel");

server.use(
  cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 })
);
server.use("/", router);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// User.createCollection().then(() => console.log("User created succesfully")); //coba buat collection

server.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to Magneticket Server!" });
});

server.listen(PORT, () => {
  console.log(`Server running on port http://${HOSTNAME}:${PORT}/`);
});
