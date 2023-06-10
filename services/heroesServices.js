const Heroes = require("../models/heroes");

const getHeroes = () => {
  return Heroes.find();
};

const findHeroesList = async ({ page, limit, search = "" }) => {
  const searchRegex = { $regex: search, $options: "i" };
  const searchRules = {
    $or: [
      { nickname: searchRegex },
      { real_name: searchRegex },
      { origin_description: searchRegex },
      { superpowers: searchRegex },
      { catch_phrase: searchRegex },
    ],
  };

  const heroesList = await Heroes.find(searchRules)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await Heroes.countDocuments(searchRules);

  return {
    heroesList,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

const createHero = ({ ...arg }) => {
  return Heroes.create(arg);
};

const changeHero = (_id, data) => {
  return Heroes.findByIdAndUpdate(_id, data, { new: true });
};

const removeHero = (_id) => {
  return Heroes.findOneAndRemove(_id);
};

const getHero = (data) => {
  return Heroes.findOne(data);
};

module.exports = {
  getHeroes,
  createHero,
  changeHero,
  removeHero,
  getHero,
  findHeroesList,
};
