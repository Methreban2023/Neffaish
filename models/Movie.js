const { model, Schema } = require("mongoose");

const movieSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    celebrity: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    genre: { type: Schema.Types.ObjectId, ref: "Genre" },
    updateGenreBy: { type: Schema.Types.ObjectId, ref: "User" },
    rating: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        rate: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Movie", movieSchema);
