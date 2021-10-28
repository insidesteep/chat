const { Router } = require("express");
const passport = require("passport");
const { AuthController } = require("../controllers");
const { auth } = require("../middlewares");

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/authorization", auth, AuthController.authorization);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  AuthController.authGoogleCallback
);

module.exports = router;
