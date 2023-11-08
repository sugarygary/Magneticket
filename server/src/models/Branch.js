const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    branch_name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema, "branches");

module.exports = Branch;
