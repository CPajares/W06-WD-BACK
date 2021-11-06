const express = require("express");
const {
  getRobots,
  getRobotbyId,
  createRobot,
  updateRobotById,
  deleteRobotById,
} = require("../controller/robotController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotbyId);

router.post("/create", createRobot);

router.put("/update", updateRobotById);

router.delete("/delete/:idRobot", deleteRobotById);

module.exports = router;
