require("dotenv").config();
const express = require("express");
const cors = require("cors");
const debug = require("debug")("robots:server");
const chalk = require("chalk");
const morgan = require("morgan");
const robotsRoute = require("./routes/robotRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFoundErrorHandler, generalErrorHandler } = require("./errors");

const authHeadauthMiddlewareer = require("./middleware/authMiddleware");

const app = express();
app.use(morgan("dev"));
app.use(cors());

const InitializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });
  server.on("error", () => {
    debug(chalk.red("Error al iniciar servidor."));
  });
};

app.use(express.json());
app.use((req, res, next) => {
  debug(chalk.yellow("Arrancando motores"));
  next();
});

/* app.use("/user", userRoutes); */
app.use("/robots", cors(), robotsRoute);
app.post("/login", cors(), authHeadauthMiddlewareer, userRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = InitializeServer;
