const {
  UserService,
  MessageService,
  ConversationService,
  FileService,
} = require("../services");
const { Message } = require("../models");
const mongoose = require("mongoose");
const { isImage } = require("../utils/file");

const create = async (req, res) => {
  console.log("FAYLI", req.files);
  try {
    const { to, body = "" } = req.body;
    const { files = [], images = [] } = req.files;

    const user1 = await UserService.get({ _id: req.profile.user._id });
    const user2 = await UserService.get({ _id: to });

    if (!user2) {
      return res.status(404).json({ error: "User not found" });
    }

    let conversation = await ConversationService.get(user1._id, user2._id);

    const savedImages = [];
    const savedFiles = [];

    await Promise.all(
      images.map(async (img) => {
        const newImage = await FileService.create({
          type: img.originalname.split(".").pop(),
          fileName: img.originalname,
          size: img.size,
          path: img.path,
        });

        await newImage.save();
        savedImages.push(newImage._id);
      })
    );

    await Promise.all(
      files.map(async (file) => {
        const newFile = await FileService.create({
          type: file.originalname.split(".").pop(),
          fileName: file.originalname,
          size: file.size,
          path: file.path,
        });

        await newFile.save();
        savedFiles.push(newFile._id);
      })
    );

    const newMessage = await MessageService.create({
      to,
      body,
      from: req.profile.user._id,
      attachments: [...savedImages, ...savedFiles],
    });

    if (!conversation) {
      conversation = await ConversationService.create({
        recipients: [newMessage.from, newMessage.to],
      });
    }

    newMessage.conversation = conversation._id;

    await newMessage.save();
    conversation.lastMessage = newMessage._id;
    console.log("wdwdw", conversation);
    await conversation.save();

    res.json(newMessage);
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await ConversationService.get(id);
    console.log(conversation);
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

const getByUser = async (req, res) => {
  try {
    const user1 = mongoose.Types.ObjectId(req.profile.user._id);
    const user2 = mongoose.Types.ObjectId(req.params.id);

    Message.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: "toObj",
        },
      },
      {
        $lookup: {
          from: "files",
          localField: "attachments",
          foreignField: "_id",
          as: "attachments_arr",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "fromObj",
        },
      },
    ])
      .match({
        $or: [
          { $and: [{ to: user1 }, { from: user2 }] },
          { $and: [{ to: user2 }, { from: user1 }] },
        ],
      })
      .project({
        "toObj.password": 0,
        "toObj.__v": 0,
        "toObj.date": 0,
        "fromObj.password": 0,
        "fromObj.__v": 0,
        "fromObj.date": 0,
        "attachments_arr._v": 0,
      })
      .exec((err, messages) => {
        if (err) {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Failure" }));
          res.sendStatus(500);
        } else {
          const dialogMessages = [];

          for (let i = 0; i < messages.length; i++) {
            dialogMessages.push({
              user: {
                id: messages[i].fromObj[0]._id,
                name: messages[i].fromObj[0].name,
                photo: messages[i].fromObj[0].avatar,
              },
              data: [
                {
                  text: messages[i].body,
                  date: messages[i].createdAt,
                  attachments: {
                    images: messages[i].attachments_arr.filter((file) =>
                      isImage(file)
                    ),
                    files: messages[i].attachments_arr.filter(
                      (file) => !isImage(file)
                    ),
                  },
                },
              ],
            });
          }

          res.send(dialogMessages);
        }
      });
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

module.exports = {
  create,
  getById,
  getByUser,
};
