const express = require("express");
const { getRobots, getRobotbyId } = require("../controller/robotController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotbyId);

module.exports = router;
