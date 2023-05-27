const service = require("../../services");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const productsDir = path.join(__dirname, "../../", "public", "images");

const updateHero = async (req, res) => {
  const { files, body } = req;
  const data = { ...body };

  if (files.length > 0) {
    const hero = await service.getHero({ _id: req.params.id });
    const Images = hero.Images;
    await files.forEach((file) => {
      const { path: tempUpload, originalname } = file;
      const newName = uuidv4() + "-" + originalname;
      const resultUpload = path.join(productsDir, newName);
      try {
        fs.rename(tempUpload, resultUpload);
        Images.push(path.join("images", newName));
        data.Images = Images;
      } catch (error) {
        fs.unlink(tempUpload);
      }
    });
  }

  const response = await service.changeHero({ _id: req.params.id }, data);

  if (!response) {
    throw new Error("Can't update this hero!");
  }
  res.status(200).json(response);
};

module.exports = updateHero;
