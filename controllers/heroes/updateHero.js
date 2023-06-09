const service = require("../../services");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { uploadImages } = require("../../utils/cloudinary");

const productsDir = path.join(__dirname, "../../", "public", "images");

const updateHero = async (req, res) => {
  const { files, body } = req;
  const data = { ...body };

  if (files.length > 0) {
    const { Images } = await service.getHero({ _id: req.params.id });
    for (let file of files) {
      const { path: tempUpload } = file;
      const fileName = uuidv4();
      const imgUrl = await uploadImages({ tempUpload, fileName });
      Images.push(imgUrl);
      data.Images = Images;
      await fs.unlink(tempUpload);
    }
  }

  const response = await service.changeHero({ _id: req.params.id }, data);

  if (!response) {
    throw new Error("Can't update this hero!");
  }
  res.status(200).json(response);
};

module.exports = updateHero;
