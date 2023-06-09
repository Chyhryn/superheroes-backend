const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");
const newName = (oldName) => {
  return oldName.split(".")[0];
};

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, newName(file.originalname));
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
