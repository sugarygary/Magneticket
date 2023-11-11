const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieTransactionSchema = new Schema(
  {
    cineplex_id: {
      type: String,
      required: true,
    },
    cineplex_brand: {
      type: String,
      required: true,
    },
    customer_id: {
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
    payment_method: {
      type: String,
      required: true,
    },
    amounts_paid: {
      type: String,
      required: true,
    },
    promo_code: { type: String, default: null },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "FAILED", "SUCCESS"],
    },
    //promo_code && FOOD
  },
  { timestamps: true }
);

const MovieTransaction = mongoose.model(
  "MovieTransaction",
  movieTransactionSchema,
  "movie_transactions"
);

module.exports = MovieTransaction;
