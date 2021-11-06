const express = require("express");
const {
  getRobots,
  getRobotbyId,
  createRobot,
  updateRobotById,
  deleteRobotById,
} = require("../controller/robotController");
const checkToken = require("../middleware/robotMiddleware");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotbyId);

router.post("/create", checkToken, createRobot);

router.put("/update", checkToken, updateRobotById);

router.delete("/delete/:idRobot", checkToken, deleteRobotById);

module.exports = router;
