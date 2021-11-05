const express = require("express");
const {
  getRobots,
  getRobotbyId,
  createRobot,
  updateRobotById,
} = require("../controller/robotController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotbyId);

router.post("/create", createRobot);

router.put("/update", updateRobotById);

module.exports = router;
