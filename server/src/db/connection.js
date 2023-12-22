require("dotenv").config();
const mongoose = require("mongoose");
let dbName;
switch (process.env.NODE_ENV) {
  case "production":
    dbName = "production_magneticket";
    break;
  case "development":
    dbName = "development_magneticket";
    break;
  case "test":
    dbName = "test_magneticket";
    break;
  default:
    dbName = "production_magneticket";
    break;
}
mongoose.connect(process.env.ATLAS_URI, { dbName });
const db = mongoose.connection;

function getDBStatus() {
  db.on("error", console.error.bind(console, "Connection failed"));
  db.once("open", function () {
    console.log("Connected successfully");
  });
}

module.exports = { db, getDBStatus };
