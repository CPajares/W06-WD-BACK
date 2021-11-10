require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("robots:DB");
const mongoose = require("mongoose");

const initiateDB = (conectingString) =>
  new Promise((resolve, reject) => {
    // PAra activar las propiedades virtuales, que no están en la DB
    mongoose.set("toJSON", {
      virtuals: true,
    });

    mongoose.connect(conectingString, (error) => {
      if (error) {
        debug(chalk.red("No se ha podido iniciar la base de datos."));
        debug(chalk.red(error.message));
        reject(error);
      }

      debug(chalk.green("in the funcking DB"));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.red("Desconectado de la DB"));
    });
  });

module.exports = initiateDB;
