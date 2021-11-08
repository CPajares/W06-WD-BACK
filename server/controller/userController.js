const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const loginUser = async (req, res, next) => {
  console.log("HELLO");
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      const error = new Error("Credentials not valids");
      error.statusCode = 401;
      next(error);
    } else {
      const authPassword = await bcrypt.compare(password, user.password);
      console.log(password, "afsfdsf");
      console.log(user.password, "aaaaaa");
      console.log(authPassword);
      if (!authPassword) {
        const error = new Error("Not authorized, wrong password");
        error.statusCode = 401;
        next(error);
      } else {
        const token = jwt.sign({ password }, "secret");
        res.json({ token });
      }
    }
  } catch (error) {
    console.log("error createusertokn", error.message);
  }
};

module.exports = loginUser;
