const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    promo_code: { type: String, required: true, unique: true },
    valid_until: { type: Date, required: true },
    discount_amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Promotion = mongoose.model("Promotion", promotionSchema, "promotions");

module.exports = Promotion;
