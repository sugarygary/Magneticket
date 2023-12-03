const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR) || 10;
const { customAlphabet } = require("nanoid");
const promotorSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company_name: { type: String, required: true },
    brand_name: { type: String, required: true },
    activated: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
    pub_id: {
      type: String,
      unique: true,
      default: function () {
        let pubIDSeparate = this.brand_name
          .replace(/[^a-zA-Z ]/g, "")
          .replace(/\s+/g, " ")
          .toLowerCase()
          .split(" ");
        let identifier = customAlphabet("1234567890abcdef", 8);
        return (
          pubIDSeparate.join("-").replace(/\s+/g, " ") + "-" + identifier()
        );
      },
    },
  },
  { timestamps: true }
);

promotorSchema.pre("save", function (next) {
  let promotor = this;
  if (!promotor.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(promotor.password, salt, function (err, hash) {
      if (err) return next(err);
      promotor.password = hash;
      next();
    });
  });
});
promotorSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};
promotorSchema.statics.deleteByEmail = async function (email) {
  const result = await this.deleteOne({ email: email }).exec();
  return result;
};
promotorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
promotorSchema.methods.activate = async function () {
  this.activated = true;
  await this.save();
};
promotorSchema.methods.verify = async function () {
  this.verified = true;
  await this.save();
};

const Promotor = mongoose.model("Promotor", promotorSchema, "promotors");

module.exports = Promotor;
