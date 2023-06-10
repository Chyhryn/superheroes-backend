const express = require("express");
const controller = require("../../controllers");
const { tryCatch } = require("../../utils/tryCatch");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.get("/", controller.getAllHeroes);

router.post("/", upload.array("Images"), controller.addHero);

router.get("/list", controller.getHeroesList);

router.get("/:id", tryCatch(controller.getHero));

router.put("/:id", upload.array("Images"), tryCatch(controller.updateHero));

router.put("/images/:id", tryCatch(controller.deleteHeroImg));

router.delete("/:id", tryCatch(controller.deleteHero));

module.exports = { heroesRouter: router };
