const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventTransactionSchema = new Schema(
  {
    _id: {
      type: String,
    },
    promotor: {
      type: Schema.ObjectId,
      required: true,
    },
    promotor_brand: {
      type: String,
      required: true,
    },
    customer_id: {
      type: Schema.ObjectId,
      required: true,
    },
    event_name: {
      type: String,
      required: true,
    },
    event_category_name: {
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
    payment_method: {
      type: String,
      required: true,
    },
    amounts_paid: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "FAILED", "SUCCESS"],
    },
    midtrans_token: { type: String, required: true },
  },
  { timestamps: true }
);

const EventTransaction = mongoose.model(
  "EventTransaction",
  eventTransactionSchema,
  "event_transactions"
);

module.exports = EventTransaction;
