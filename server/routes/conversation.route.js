const { Router } = require("express");
const { ConversationController } = require("../controllers");
const { auth } = require("../middlewares");
const { Conversation } = require("../models");

const router = Router();

router.get("/", auth, ConversationController.list);

module.exports = router;
