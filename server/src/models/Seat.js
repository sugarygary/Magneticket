const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  studio: { type: Schema.ObjectId, ref: "Studio", required: true },
  seat_number: { type: String, required: true },
});

const Seat = mongoose.model("Seat", seatSchema, "seats");

module.exports = Seat;
