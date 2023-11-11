const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    img: { type: String },
    synopsis: { type: String },
    rating: { type: String },
    runtime_minutes: { type: Number },
    director: {
      _id: { type: String },
      director_name: { type: String, required: true },
      img: { type: String },
    },
    casts: [
      {
        _id: { type: String },
        cast_name: { type: String, required: true },
        img: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema, "movies");

module.exports = Movie;
