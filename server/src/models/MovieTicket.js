// https://blog.allegro.tech/2021/10/comparing-mongodb-composite-indexes.html nitip link buat belajar
// https://www.mongodb.com/docs/manual/core/index-unique/#:~:text=Unique%20Compound%20Index&text=If%20you%20use%20the%20unique,of%20the%20index%20key%20values.&text=The%20created%20index%20enforces%20uniqueness,%2C%20lastname%20%2C%20and%20firstname%20values.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieTicketSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    screening: { type: Schema.ObjectId, ref: "Screening", required: true },
    seats: {
      type: [{ type: Schema.ObjectId, ref: "Seat" }],
      validate: (seat) => Array.isArray(seat) && seat.length > 0,
    },
    foods: [{ type: Schema.ObjectId, ref: "Menu" }],
    transaction: {
      type: Schema.ObjectId,
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
