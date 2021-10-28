const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    recipients: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

module.exports = model("Conversation", conversationSchema);
