const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    movies: { type: Schema.Types.ObjectId, ref: "Movie" },
    users: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        reviewText: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Review", reviewSchema);
