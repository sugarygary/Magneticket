const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    promo_code: { type: String, required: true, unique: true },
    valid_until: { type: Date, required: true },
    discount_amount: { type: Number, required: true },
    minimum_transaction: { type: Number },
  },
  { timestamps: true }
);
promotionSchema.statics.removePromo = async function (id) {
  try {
    const result = await this.deleteOne({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

const Promotion = mongoose.model("Promotion", promotionSchema, "promotions");

module.exports = Promotion;
