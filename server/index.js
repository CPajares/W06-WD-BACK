require("dotenv").config();
const express = require("express");
const debug = require("debug")("robots:server");
const chalk = require("chalk");
const morgan = require("morgan");
const robotsRoute = require("./routes/robotRoutes");
const { notFoundErrorHandler, generalErrorHandler } = require("./errors");

const app = express();

const InitializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });
  server.on("error", () => {
    debug(chalk.red("Error al iniciar servidor."));
  });
};

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  debug(chalk.yellow("Arrancando motores"));
  next();
});

app.use("/robots", robotsRoute);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = InitializeServer;
