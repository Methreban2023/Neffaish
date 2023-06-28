const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
