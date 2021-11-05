const chalk = require("chalk");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotbyId = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const robot = await Robot.findById(idRobot);
    if (robot) {
      res.json(robot);
    } else {
      const error = new Error("Pet not found");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    error.message = "Fail!";
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    console.log(newRobot);
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "Objeto no válido, espabila!";
    next(error);
  }
};

module.exports = { getRobots, getRobotbyId, createRobot };
