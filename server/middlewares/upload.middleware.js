const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `uploads/${req.profile.user.email}`;

    fs.stat(path, function (err) {
      if (err) {
        fs.mkdir(path, function (err) {
          if (err) throw err;
          console.log("Папка создана");
        });
      }

      cb(null, path);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
