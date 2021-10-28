const { User, Conversation, Message } = require("../models");

class ConversationService {
  async create(conversationData) {
    return new Conversation(conversationData);
  }

  async get(from, to) {
    return await Conversation.findOne({
      $and: [
        {
          recipients: from,
          recipients: to,
        },
      ],
    });
  }

  async list(user) {
    return await Conversation.find({ recipients: user._id }).populate(
      "recipients lastMessage"
    );
  }

  async getById(id) {
    return await Conversation.find({ _id: id });
  }

  async find(term, filter = {}) {
    return await User.find({
      name: { $regex: term, $options: "i" },
      ...filter,
    });
  }
}

module.exports = new ConversationService();
