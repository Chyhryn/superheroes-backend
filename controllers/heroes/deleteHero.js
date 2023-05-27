const service = require("../../services");
const fs = require("fs/promises");
const path = require("path");

const productsDir = path.join(__dirname, "../../", "public");

const deleteHero = async (req, res) => {
  const hero = await service.getHero({ _id: req.params.id });

  const response = await service.removeHero({ _id: req.params.id });

  if (!response) {
    throw new Error("Can't delete hero!");
  }

  hero.Images.forEach((image) => {
    const resultUpload = path.join(productsDir, image);
    fs.unlink(resultUpload);
  });

  res.status(204).json({ message: "Successfully!" });
};

module.exports = deleteHero;
