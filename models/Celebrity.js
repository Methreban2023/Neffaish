const { model, Schema } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updateGenreBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Celebrity", celebritySchema);
