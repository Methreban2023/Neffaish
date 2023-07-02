const { model, Schema } = require("mongoose");

const movieSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    celebrity: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    genre: { type: Schema.Types.ObjectId, ref: "Genre" },
    releaseDate: Date,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = model("Movie", movieSchema);
