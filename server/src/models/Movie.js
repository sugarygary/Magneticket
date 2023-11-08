const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const castSchema = new Schema({
  _id: { type: String },
  cast_name: { type: String, required: true },
  img: { type: String },
});

const movieSchema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    img: { type: String },
    synopsis: { type: String },
    rating: { type: String },
    runtime_minutes: { type: Number },
    director: castSchema,
    casts: [castSchema],
    row: { type: Number, required: true },
    seating_layout: { type: String, required: true, validate: /^(\d+-)+\d+$/ },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema, "movies");

module.exports = Movie;
