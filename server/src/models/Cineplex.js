const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cineplexSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company_name: { type: String, required: true },
    brand_name: { type: String, required: true },
    activated: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Cineplex = mongoose.model("Cineplex", cineplexSchema, "cineplexes");

module.exports = Cineplex;
