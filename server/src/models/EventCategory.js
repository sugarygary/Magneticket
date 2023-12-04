const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;

const eventCategorySchema = new Schema(
  {
    event: { type: Schema.ObjectId, ref: "Event", required: true },
    category_name: { type: String, required: true },
    price: { type: Number, required: true },
    slot: { type: Number, required: true },
  },
  { timestamps: true }
);

eventCategorySchema.statics.findByEvent = async function (eventId) {
  try {
    const categories = await this.find({ event: eventId });

    return categories;
  } catch (error) {
    throw error;
  }
};

const EventCategory = mongoose.model( 
  "EventCategory",
  eventCategorySchema,
  "event_categories"
);

module.exports = EventCategory;
