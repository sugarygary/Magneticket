const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
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
        let pubIDSeparate = this.item_name
          .replace(/[^a-zA-Z ]/g, "")
          .replace(/\s+/g, " ")
          .toLowerCase()
          .split(" ");
        let identifier = customAlphabet("1234567890abcdef", 8);
        return (
          pubIDSeparate.join("-").replace(/\s+/g, " ") + "-" + identifier()
        );
      },
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema, "menus");

module.exports = Menu;
