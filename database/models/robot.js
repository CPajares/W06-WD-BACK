const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  features: {
    type: Object,
    require: true,
    speed: {
      type: Number,
      min: 0,
      max: 10,
      require: true,
    },
    resistence: {
      type: Number,
      min: 0,
      max: 10,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
});

const Robot = model("Robot", robotSchema, "robots");

module.exports = Robot;
