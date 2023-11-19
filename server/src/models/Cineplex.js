const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR) || 10;
const { customAlphabet } = require("nanoid");
const cineplexSchema = new Schema(
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

cineplexSchema.pre("save", function (next) {
  let cineplex = this;
  if (!cineplex.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(cineplex.password, salt, function (err, hash) {
      if (err) return next(err);
      cineplex.password = hash;
      next();
    });
  });
});
cineplexSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};
cineplexSchema.statics.findById = function (cineplexId) {
  return this.findOne({ _id: cineplexId });
};
cineplexSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
cineplexSchema.methods.activate = async function () {
  this.activated = true;
  await this.save();
};
cineplexSchema.methods.verify = async function () {
  this.verified = true;
  await this.save();
};

const Cineplex = mongoose.model("Cineplex", cineplexSchema, "cineplexes");

module.exports = Cineplex;
