//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieTransactionSchema = new Schema(
  {
    cineplex_id: {
      type: String,
    },
    customer_id: {
      type: String,
    },
    customer_name: {
      type: String,
    },
    customer_email: {
      type: String,
    },
    movie_title: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "FAILED", "SUCCESS"],
    },
    //promo_code
  },
  { timestamps: true }
);

const MovieTransaction = mongoose.model(
  "MovieTransaction",
  MovieTransaction,
  "movie_transactions"
);

module.exports = MovieTransaction;
