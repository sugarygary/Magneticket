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
const { errorHandler, notFound } = require("./middlewares/errorMiddlewares");
const bodyParser = require("body-parser");

server.use(
  cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use("/api", router);

getDBStatus();

server.get("/", (req, res) => {
  console.log(req.body);
  return res.status(200).send({ message: "Welcome to Magneticket Server!" });
});

init();
server.use(errorHandler);
server.use(notFound);
server.listen(PORT, async () => {
  console.log(`Server running on port http://${HOSTNAME}:${PORT}/`);
});
