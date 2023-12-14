require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/Router");
const { db, getDBStatus } = require("./db/connection");
const init = require("./db/init");
const { errorHandler, notFound } = require("./middlewares/errorMiddlewares");

server.use(
  cors({
    origin: `http://34.101.107.164:${PORT}`,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// server.use(formidable());
server.use(cookieParser());
// server.use(function (req, res, next) {
//   setTimeout(next, 1000);
// });
server.use(express.static("uploads"));
server.use("/api", router);

getDBStatus();

server.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to Magneticket Server!" });
});

init();
server.use(notFound);
server.use(errorHandler);
server.listen(PORT, async () => {
  console.log(`Server running on port http://${HOSTNAME}:${PORT}/`);
});
