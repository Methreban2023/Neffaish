const { model, Schema } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

module.exports = model("Celebrity", celebritySchema);
