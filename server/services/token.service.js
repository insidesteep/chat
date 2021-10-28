const jwt = require("jsonwebtoken");
require("dotenv").config;

class Token {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });

    return accessToken;
  }

  async validate(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new Token();
