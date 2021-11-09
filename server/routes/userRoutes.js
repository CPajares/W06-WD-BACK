const express = require("express");
const bcrypt = require("bcrypt");
const { validate } = require("express-validation");
const User = require("../../database/models/user");
const loginUser = require("../controller/userController");
const userLoginValidation = require("../schema/userSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  await User.create({
    user: "pedro",
    username: "marmol",
    password: await bcrypt.hash("sandia", 10),
  });
  res.json("creado");
});

router.use("/", validate(userLoginValidation), loginUser);

module.exports = router;
