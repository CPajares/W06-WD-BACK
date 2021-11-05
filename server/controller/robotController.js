const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotbyId = async (req, res) => {
  console.log("entra");
  const { idRobot } = req.params;
  console.log(req.params);
  const robot = await Robot.findById(idRobot);
  res.json(robot);
};

module.exports = { getRobots, getRobotbyId };
