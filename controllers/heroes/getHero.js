const service = require("../../services");

const getAllHeroes = async (req, res) => {
  const id = req.params.id;
  const response = await service.getHero({ _id: id });
  if (!response) {
    throw new Error("Something wrong!");
  }
  res.status(200).json(response);
};

module.exports = getAllHeroes;
