const express = require("express");
const {
  getRobots,
  getRobotbyId,
  createRobot,
} = require("../controller/robotController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotbyId);

router.post("/create", createRobot);

module.exports = router;
