const service = require("../../services");
const {
  cloudinaryImgId,
  deleteFromCloudinary,
} = require("../../utils/cloudinary");

const deleteHero = async (req, res) => {
  const { Images } = await service.getHero({ _id: req.params.id });

  const response = await service.removeHero({ _id: req.params.id });

  if (!response) {
    throw new Error("Can't delete hero!");
  }

  for (let image of Images) {
    const fileName = cloudinaryImgId(image);
    await deleteFromCloudinary(fileName);
  }

  res.status(204).json({ message: "Successfully!" });
};

module.exports = deleteHero;
