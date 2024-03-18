require("dotenv").config();
const config = require("./utils/config");
const express = require("express");
const logger = require("./utils/logger");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const tokenExtractorMiddleware = require("./utils/middleware");
const app = express();



mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
//Para hacer que express muestre contenido estático, la página index.html y el JavaScript, etc., necesitamos un middleware integrado de express llamado static.
app.use(express.static("dist"));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
//app.use(tokenExtractorMiddleware);
app.use("/api/blogs", blogRoutes);





app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

//app.use(errorHandler);
module.exports = app;
