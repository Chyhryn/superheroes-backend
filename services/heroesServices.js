const Heroes = require("../models/heroes");

const getHeroes = () => {
  return Heroes.find();
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

module.exports = { getHeroes, createHero, changeHero, removeHero, getHero };
