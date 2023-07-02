const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    reviewText: { type: String },
    rating: Number,
  },
  { timestamps: true }
);

module.exports = model("Review", reviewSchema);
