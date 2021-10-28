const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
      default: "",
    },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    unread: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
