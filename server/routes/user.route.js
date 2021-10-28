const { Router } = require("express");
const { UserController } = require("../controllers");
const { auth } = require("../middlewares");

const router = Router();

router.get("/", auth, UserController.search);
router.get("/:id", auth, UserController.getById);

module.exports = router;
