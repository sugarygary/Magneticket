const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
  studio: { type: Schema.ObjectId, ref: "Studio", required: true },
  seat_number: { type: String, required: true },
});
seatSchema.index({ studio: 1, seat_number: 1 }, { unique: true });
const Seat = mongoose.model("Seat", seatSchema, "seats");

module.exports = Seat;
