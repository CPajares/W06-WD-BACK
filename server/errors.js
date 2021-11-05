const debug = require("debug")("robot:errors");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  debug("Ops, error detectado: ", error.message);
  const message = error.code ? error.message : "";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
