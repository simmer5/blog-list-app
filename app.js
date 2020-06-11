const config = require("./utils/config");
const express = require("express");
const app = express();
const postsRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error on connection to MongoDB:", error.message);
  });
app.use(cors());
//app.use(express.static('build'))
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", postsRouter);
app.use("/api/users", usersRouter);
app.use("api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
