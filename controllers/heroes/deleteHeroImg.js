const service = require("../../services");

const {
  deleteFromCloudinary,
  cloudinaryImgId,
} = require("../../utils/cloudinary");

const deleteHeroImg = async (req, res) => {
  const data = req.body;

  const hero = await service.getHero({ _id: req.params.id });
  const Images = hero.Images.filter((image) => image !== data.image);

  const fileName = cloudinaryImgId(data.image);
  await deleteFromCloudinary(fileName);

  const response = await service.changeHero({ _id: req.params.id }, { Images });

  if (!response) {
    throw new Error("Can't delete image");
  }

  res.status(200).json(response);
};

module.exports = deleteHeroImg;
