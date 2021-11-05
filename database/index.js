require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("robots:DB");
const mongoose = require("mongoose");

const initiateDB = () => {
  mongoose.connect(process.env.MONGO_DB, (error) => {
    if (error) {
      debug(chalk.red("No se ha podido iniciar la base de datos."));
      debug(chalk.red(error.message));
      return;
    }

    debug(chalk.green("in the funcking DB"));
  });
};

module.exports = initiateDB;
