const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  full_name: String,
  activated: Boolean,
  //   activation_code: String, //entah mau dipisah atau ngga
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
