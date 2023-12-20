const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieTicketSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    customer: { type: Schema.ObjectId, ref: "User" },
    screening: { type: Schema.ObjectId, ref: "Screening", required: true },
    seats: [{ type: Schema.ObjectId, ref: "Seat" }],
    foods: [
      {
        _id: false,
        food_id: { type: Schema.ObjectId, ref: "Menu" },
        quantity: { type: Number },
      },
    ],
    transaction: {
      type: String,
      ref: "MovieTransaction",
    },
    via: {
      type: String,
      default: "MAGNETICKET",
      enum: ["MAGNETICKET", "OFFLINE"],
    },
    claimed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MovieTicket = mongoose.model(
  "MovieTicket",
  movieTicketSchema,
  "movie_tickets"
);

module.exports = MovieTicket;
