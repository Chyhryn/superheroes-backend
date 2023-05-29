const app = require("../app");
const Hero = require("../models/heroes");

const connection = require("../db/connections");

const mockHero = {
  nickname: "test",
  real_name: "test",
  origin_description: "test",
  superpowers: "test, test",
  catch_phrase: "test",
  Images: ["test.jpeg", "test2.jpeg"],
};

describe("heroes.js", () => {
  it("should just pass", async () => {
    const response = await Hero.create(mockHero);
    console.log(response);
  });
});
