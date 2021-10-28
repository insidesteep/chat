const { File } = require("../models");

class FileService {
  async create(fileData) {
    return new File(fileData);
  }
}

module.exports = new FileService();
