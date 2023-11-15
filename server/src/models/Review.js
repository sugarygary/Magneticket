const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    reviewer: { type: Schema.ObjectId, ref: "User", required: true },
    movie: { type: String, ref: "Movie", required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);
reviewSchema.index({ reviewer: 1, movie: 1 }, { unique: true });
const Review = mongoose.model("Review", reviewSchema, "reviews");

module.exports = Review;
