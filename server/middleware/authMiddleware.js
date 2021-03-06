const jwt = require("jsonwebtoken");

const authHeadauthMiddlewareer = async (req, res, next) => {
  console.log("dentro Midleware");
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("Not autorized header");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      const error = new Error("Not autorized token");
      error.code = 401;
      next(error);
    } else {
      try {
        const authok = await jwt.verify(token, process.env.JWT_SECRET);

        req.userId = authok.id;

        next();
      } catch (error) {
        error.message = "Incorrect token";
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = authHeadauthMiddlewareer;
