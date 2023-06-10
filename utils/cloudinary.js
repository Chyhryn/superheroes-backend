const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryImgId = (image) => {
  const lastSlashIndex = image.lastIndexOf("/");
  const lastDotIndex = image.lastIndexOf(".");
  const fileName =
    "heroes/" + image.substring(lastSlashIndex + 1, lastDotIndex);
  return fileName;
};

const uploadImages = async (image) => {
  const { tempUpload, fileName } = image;
  try {
    const res = await cloudinary.uploader.upload(tempUpload, {
      public_id: fileName,
      folder: "heroes",
    });
    return res.secure_url;
  } catch (error) {
    return error;
  }
};

const deleteFromCloudinary = async (imageId) => {
  await cloudinary.uploader.destroy(imageId);
};

module.exports = {
  uploadImages,
  deleteFromCloudinary,
  cloudinaryImgId,
};
