const debug = require("debug")("robot:errors");
const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ message: "Very bad request" });
  }
  debug("Ops, error detectado: ", error.message);
  const message = error.code ? error.message : "";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
