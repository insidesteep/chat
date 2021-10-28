const { Router } = require("express");
const { MessageController } = require("../controllers");
const { auth, upload } = require("../middlewares");

const router = Router();

router.post(
  "/",
  auth,
  upload.fields([{ name: "images" }, { name: "files" }]),
  MessageController.create
);
router.get("/conversation/:id", auth, MessageController.getByUser);

module.exports = router;
