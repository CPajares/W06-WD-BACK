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
      const error = new Error("Robot not found");
      error.code = 404;
      next(error);
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
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "Objeto no válido, espabila!";
    next(error);
  }
};

const updateRobotById = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const newRobot = await Robot.findByIdAndUpdate(_id, req.body);

    if (newRobot) {
      res.json(req.body);
    } else {
      const error = new Error("Not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.message = "Objeto no válido, espabila!";
    error.code = 400;
    next(error);
  }
};

const deleteRobotById = async (req, res, next) => {
  try {
    const { idRobot } = req.params;
    await Robot.findByIdAndDelete(idRobot);
    res.json({ idRobot });
  } catch (error) {
    error.message = "Objeto no válido, espabila!";
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getRobots,
  getRobotbyId,
  createRobot,
  updateRobotById,
  deleteRobotById,
};
