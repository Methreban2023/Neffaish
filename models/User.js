const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    staff: { type: Boolean, default: false },
    photo: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
