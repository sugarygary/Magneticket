// https://blog.allegro.tech/2021/10/comparing-mongodb-composite-indexes.html nitip link buat belajar
// https://www.mongodb.com/docs/manual/core/index-unique/#:~:text=Unique%20Compound%20Index&text=If%20you%20use%20the%20unique,of%20the%20index%20key%20values.&text=The%20created%20index%20enforces%20uniqueness,%2C%20lastname%20%2C%20and%20firstname%20values.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventTicketSchema = new Schema(
  {
    promotor: { type: Schema.ObjectId, ref: "Promotor", required: true },
    customer: { type: Schema.ObjectId, ref: "User" },
    event: {
      type: Schema.ObjectId,
      ref: "Event",
      required: true,
    },
    event_category: {
      type: Schema.ObjectId,
      ref: "EventCategory",
      required: true,
    },
    transaction: {
      type: Schema.ObjectId,
      ref: "EventTransaction",
    },
    claimed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const EventTicket = mongoose.model(
  "EventTicket",
  eventTicketSchema,
  "event_tickets"
);

module.exports = EventTicket;
