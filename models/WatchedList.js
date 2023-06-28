const { model, Schema } = require("mongoose");

const watchedSchema = new Schema(
  {
    users: { type: Schema.Types.ObjectId, ref: "User" },
    movies: [
      {
        movie: { type: Schema.Types.ObjectId, ref: "Movie" },
        watched: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("WatchedList", watchedSchema);
