const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    item_name: { type: String, required: true },
    item_description: { type: String, required: true },
    price: { type: Number, required: true },
    pub_id: {
      type: String,
      unique: true,
      default: function () {
        let pubIDSeparate = this.item_name.toLowerCase().split(" ");
        return pubIDSeparate.join("-") + "-" + nanoid(8);
      },
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema, "menus");

module.exports = Menu;
