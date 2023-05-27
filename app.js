const express = require("express");
const { heroesRouter } = require("./routes/api/heroesRouter");
const {healthzRouter} = require("./routes/api/healthzRouter");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/healthz", healthzRouter);
app.use("/api/heroes", heroesRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((err, _, res, __) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
