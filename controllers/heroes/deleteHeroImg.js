const service = require("../../services");
const fs = require("fs/promises");
const path = require("path");

const deleteHeroImg = async (req, res) => {
  const data = req.body;

  const hero = await service.getHero({ _id: req.params.id });
  const Images = hero.Images.filter((image) => image !== data.image);

  const response = await service.changeHero({ _id: req.params.id }, { Images });

  if (!response) {
    throw new Error("Can't delete image");
  }
  const imgPath = path.join(__dirname, "../../", "public", data.image);

  fs.unlink(imgPath);

  res.status(200).json(response);
};

module.exports = deleteHeroImg;
