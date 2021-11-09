const express = require("express");
const { validate } = require("express-validation");
const loginUser = require("../controller/userController");
const userLoginValidation = require("../schema/userSchema");

const router = express.Router();

router.use("/", validate(userLoginValidation), loginUser);

module.exports = router;
