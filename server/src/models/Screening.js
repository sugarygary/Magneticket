const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screeningSchema = new Schema(
  {
    movie: { type: Schema.ObjectId, ref: "Movie", required: true },
    studio: { type: Schema.ObjectId, ref: "Studio", required: true },
    price: { type: Number, required: true, min: 1 },
    showtime: { type: Date, required: true },
  },
  { timestamps: true }
);

const Screening = mongoose.model("Screening", screeningSchema, "screenings");

module.exports = Screening;
