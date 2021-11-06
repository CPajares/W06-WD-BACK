require("dotenv").config();

const checkToken = (req, res, next) => {
  if (process.env.TOKEN_ACCES === req.query.token) {
    next();
  } else {
    const error = new Error("Token no válido");
    error.code = 401;
    throw error;
  }
};

module.exports = checkToken;
