const { Message } = require("../models");

class MessageService {
  async create(messageData) {
    return new Message(messageData);
  }

  async get(filter) {
    return await Message.findOne(filter);
  }

  async getAll(filter, populate) {
    return await Message.find(filter).populate(populate);
  }

  async getUnreadMessagesCount(user) {
    const messages = await Message.find({ to: user._id });

    return messages.filter((m) => m.unread).length;
  }
}

module.exports = new MessageService();
