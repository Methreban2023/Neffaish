const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
    usersReviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        reviewText: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Review", reviewSchema);
