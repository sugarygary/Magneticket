const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studioSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    branch: { type: Schema.ObjectId, ref: "Branch", required: true },
    studio_name: { type: String, required: true },
    type: { type: String, required: true },
    row: { type: Number, required: true },
    seating_layout: { type: String, required: true, validate: /^(\d+-)+\d+$/ },
  },
  { timestamps: true }
);
studioSchema.index({ branch: 1, studio_name: 1 }, { unique: true });
const Studio = mongoose.model("Studio", studioSchema, "studios");

module.exports = Studio;
