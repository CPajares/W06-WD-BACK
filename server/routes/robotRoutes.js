const express = require("express");
const {
  getRobots,
  getRobotbyId,
  createRobot,
  updateRobotById,
  deleteRobotById,
} = require("../controller/robotController");
const authHeadauthMiddlewareer = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotbyId);

router.post("/create", authHeadauthMiddlewareer, createRobot);

router.put("/update", authHeadauthMiddlewareer, updateRobotById);

router.delete("/delete/:idRobot", authHeadauthMiddlewareer, deleteRobotById);

module.exports = router;
