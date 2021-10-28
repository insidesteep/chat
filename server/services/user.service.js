const { User } = require("../models");

class UserService {
  async create(userData) {
    return await User.create(userData);
  }

  async get(filter) {
    return await User.findOne(filter);
  }

  async find(term, filter = {}) {
    return await User.find({
      name: { $regex: term, $options: "i" },
      ...filter,
    });
  }
}

module.exports = new UserService();
