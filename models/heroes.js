const { Schema, model } = require("mongoose");

const heroSchema = new Schema(
  {
    nickname: { type: String, minlength: 2, maxlength: 70, required: true },
    real_name: { type: String, minlength: 2, maxlength: 100, required: true },
    origin_description: {
      type: String,
      minlength: 20,
      maxlength: 1000,
      required: true,
    },
    superpowers: {
      type: String,
      minlength: 10,
      maxlength: 500,
      required: true,
    },
    catch_phrase: {
      type: String,
      minlength: 2,
      maxlength: 300,
      required: true,
    },
    Images: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

const Heroes = model("heroes", heroSchema);

module.exports = Heroes;
