const service = require("../../services");
const fs = require("fs/promises");
const path = require("path");

const imagesDir = path.join(__dirname, "../../", "public", "images");

const addHero = async (req, res) => {
  const { files, body } = req;
  const Images = [];
  await files.forEach((file) => {
    const { path: tempUpload, originalname } = file;
    const resultUpload = path.join(imagesDir, originalname);
    try {
      fs.rename(tempUpload, resultUpload);
      Images.push(path.join("images", originalname));
    } catch (error) {
      fs.unlink(tempUpload);
    }
  });

  const newHero = { ...body, Images };

  const response = await service.createHero(newHero);
  if (!response) {
    throw new Error("Can't add hero!");
  }
  res.status(201).json(response);
};

module.exports = addHero;
