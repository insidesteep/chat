const passport = require("passport");
const { UserService, TokenService } = require("../services");
require("dotenv").config();

const registration = async (req, res) => {
  try {
    let user = await UserService.get({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "User exists" });
    }

    user = await UserService.create(req.body);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

const authorization = async (req, res) => {
  try {
    const profile = await UserService.get({ _id: req.profile.user._id });

    res.json(profile);
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

const authGoogleCallback = (req, res) => {
  try {
    const token = TokenService.generate({ user: req.user });
    const redirectURL =
      process.env.NODE_ENV === "production" ? "/" : process.env.CLIENT_URL;

    res.cookie("token", token);
    res.redirect(redirectURL);
  } catch (e) {
    res.status(500).json({ error: `Server Error: ${e.message}` });
  }
};

module.exports = {
  registration,
  authorization,
  authGoogleCallback,
};
