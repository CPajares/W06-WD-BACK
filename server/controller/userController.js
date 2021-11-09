const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error("Credentials not valids");
      error.statusCode = 401;
      next(error);
    } else {
      const authPassword = await bcrypt.compare(password, user.password);

      if (!authPassword) {
        const error = new Error("Not authorized");
        console.log("general pete");
        error.statusCode = 401;
        next(error);
      } else {
        const token = jwt.sign({ user, id: user.id }, process.env.JWT_SECRET);
        res.json({ token });
      }
    }
  } catch (error) {
    error.message = "Incorrect token";
    error.code = 401;
    next(error);
  }
};

module.exports = loginUser;
