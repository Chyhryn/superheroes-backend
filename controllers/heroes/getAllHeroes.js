const service = require("../../services");

const getAllHeroes = async (req, res) => {
  const response = await service.getHeroes();
  if (!response) {
    throw new Error("Something wrong!");
  }
  res.status(200).json(response);
};

module.exports = getAllHeroes;
