const {
  UserService,
  ConversationService,
  MessageService,
} = require("../services");

const search = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(403).json({ error: "search is required" });
    }

    let users = await UserService.find(search, {
      _id: { $ne: req.profile.user._id },
    });

    res.json(users);
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await UserService.get({ _id: id });
    console.log(222);
    const conversation = await ConversationService.get(
      req.profile.user._id,
      id
    );

    const messages = await MessageService.getAll(
      { conversation },
      "attachments"
    );

    const filtred = messages.filter((msg) => msg.attachments.length);

    let media = [];

    filtred.forEach((file) => (media = [...media, ...file.attachments]));
    console.log(media);

    res.json({ info: user, media });
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

module.exports = {
  search,
  getById,
};
