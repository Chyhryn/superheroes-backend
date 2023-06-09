const service = require("../../services");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { uploadImages } = require("../../utils/cloudinary");

const addHero = async (req, res) => {
  const { files, body } = req;
  const Images = [];
  for (const file of files) {
    const { path: tempUpload } = file;
    const fileName = uuidv4();
    const imgUrl = await uploadImages({ tempUpload, fileName });
    Images.push(imgUrl);
    await fs.unlink(tempUpload);
  }

  const newHero = { ...body, Images };

  const response = await service.createHero(newHero);
  if (!response) {
    throw new Error("Can't add hero!");
  }
  res.status(201).json(response);
};

module.exports = addHero;
