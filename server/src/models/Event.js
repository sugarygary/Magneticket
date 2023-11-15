const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    promotor: { type: Schema.ObjectId, ref: "Promotor", required: true },
    event_name: { type: String, required: true },
    event_description: { type: String },
    venue: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    showtime: { type: Date, required: true },
    sale_end_date: { type: Date, required: true },
    verified: { type: Boolean, required: true, default: false },
    pub_id: {
      type: String,
      unique: true,
      default: function () {
        let identifier = customAlphabet("1234567890abcdef", 8);
        let pubIDSeparate = this.event_name
          .replace(/[^a-zA-Z ]/g, "")
          .replace(/\s+/g, " ")
          .toLowerCase()
          .split(" ");
        return (
          pubIDSeparate.join("-") +
          "-" +
          this.showtime.getFullYear() +
          this.showtime.getMonth() +
          this.showtime.getDate() +
          "-" +
          identifier()
        );
      },
    },
  },
  { timestamps: true }
);
eventSchema.methods.verify = async function () {
  this.verified = true;
  await this.save();
};

const Event = mongoose.model("Event", eventSchema, "events");

module.exports = Event;
