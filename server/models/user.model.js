const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    lastVisit: {
      type: Date,
      default: Date.now(),
    },
    activity: {
      type: String,
      enum: ["online", "offline", "working"],
      default: "offline",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
