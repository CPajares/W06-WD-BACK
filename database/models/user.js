const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

module.exports = User;
