const { model, Schema } = require("mongoose");
const Movie = require("./Movie");

const watchedSchema = new Schema(
  {
    // user
    // movie
    // watched
    user: { type: Schema.Types.ObjectId, ref: "User" },
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
