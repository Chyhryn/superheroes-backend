const { Schema, model } = require("mongoose");

const mongooseErrorHandler = require("../middlewares/mongooseErrorHandler");

const heroSchema = new Schema(
  {
    nickname: { type: String, required: true },
    real_name: { type: String, required: true },
    origin_description: {
      type: String,
      required: true,
    },
    superpowers: {
      type: String,
      required: true,
    },
    catch_phrase: {
      type: String,
      required: true,
    },
    Images: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

heroSchema.post("save", mongooseErrorHandler);

const Heroes = model("heroes", heroSchema);

module.exports = Heroes;
