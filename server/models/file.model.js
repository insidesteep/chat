const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("File", fileSchema);
