const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;
const branchSchema = new Schema(
  {
    cineplex: { type: Schema.ObjectId, ref: "Cineplex", required: true },
    branch_name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pub_id: {
      type: String,
      unique: true,
      default: function () {
        let pubIDSeparate = this.branch_name.toLowerCase().split(" ");
        pubIDSeparate.map((str) => (str = str.replace(/[^a-zA-Z ]/g, "")));
        let identifier = customAlphabet("1234567890abcdef", 8);
        return (
          pubIDSeparate.join("-").replace(/\s+/g, " ") + "-" + identifier()
        );
      },
    },
  },
  { timestamps: true }
);
branchSchema.statics.findByBranchName = function (branch_name) {
  return this.findOne({ branch_name: branch_name });
};
const Branch = mongoose.model("Branch", branchSchema, "branches");

module.exports = Branch;
