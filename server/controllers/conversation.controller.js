const { ConversationService, MessageService } = require("../services");

const list = async (req, res) => {
  try {
    const { user } = req.profile;

    const conversations = await ConversationService.list(user);


    const formatedConversation = [];

    await Promise.all(
      conversations.map(async (conversation) => {
        const partner = conversation.recipients.find((r) => r._id != user._id);

        const isMe = conversation.lastMessage.from == user._id;
        let unreadCount = 0;

        if (!isMe) {
          unreadCount = await MessageService.getUnreadMessagesCount(partner);
        }

        formatedConversation.push({
          id: conversation._id,
          partnerId: partner._id,
          userName: partner.name,
          photo: partner.avatar,
          message: conversation.lastMessage.body,
          date: conversation.lastMessage.createdAt,
          status: partner.activity,
          unread: conversation.lastMessage.unread,
          isMe,
          unreadCount,
        });
      })
    );

    res.json(formatedConversation);
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

module.exports = {
  list,
};
