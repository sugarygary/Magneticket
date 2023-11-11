const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR) || 10;
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    activated: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.activate = async function () {
  this.activated = true;
  await this.save();
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
