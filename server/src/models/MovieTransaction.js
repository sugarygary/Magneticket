const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieTransactionSchema = new Schema(
  {
    _id: {
      type: String,
    },
    cineplex_id: {
      type: Schema.ObjectId,
      required: true,
    },
    cineplex_brand: {
      type: String,
      required: true,
    },
    customer_id: {
      type: Schema.ObjectId,
      required: true,
    },
    branch_name: {
      type: String,
      required: true,
    },
    studio_name: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    movie_title: {
      type: String,
      required: true,
    },
    movie_id: {
      type: String,
      required: true,
    },
    movie_img: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    amounts_paid: {
      type: Number,
      required: true,
    },
    promo_code: { type: String, default: null },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "FAILED", "SUCCESS", "REFUND"],
    },
    seats: [{ type: String }],
    foods: [
      {
        food_name: { type: String },
        quantity: { type: String },
      },
    ],
    midtrans_token: { type: String, required: true },
  },
  { timestamps: true }
);

const MovieTransaction = mongoose.model(
  "MovieTransaction",
  movieTransactionSchema,
  "movie_transactions"
);

module.exports = MovieTransaction;
