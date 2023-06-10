const service = require("../../services");

const getHeroesList = async (req, res) => {
  const response = await service.findHeroesList(req.query);
  if (!response) {
    throw new Error("Something wrong!");
  }

  res.status(200).json(response);
};

module.exports = getHeroesList;
