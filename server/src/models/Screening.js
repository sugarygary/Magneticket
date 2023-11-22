const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;

const screeningSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    movie: { type: String, ref: "Movie", required: true },
    studio: { type: Schema.ObjectId, ref: "Studio", required: true },
    branch: { type: Schema.ObjectId, ref: "Branch", required: true },
    price: { type: Number, required: true, min: 1 },
    showtime: { type: Date, required: true },
    pub_id: {
      type: String,
      unique: true,
      default: function () {
        let identifier = customAlphabet("1234567890abcdef", 8);
        return (
          this.movie +
          "-" +
          this.showtime.getFullYear() +
          (this.showtime.getMonth() + 1) +
          this.showtime.getDate() +
          "-" +
          identifier()
        );
      },
    },
  },
  { timestamps: true }
);

const Screening = mongoose.model("Screening", screeningSchema, "screenings");

module.exports = Screening;
