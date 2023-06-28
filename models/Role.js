const { model, Schema } = require("mongoose");

const roleSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    celebrityInMovie: [
      {
        movies: { type: Schema.Types.ObjectId, ref: "Movie" },
        celebrities: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Role", roleSchema);
