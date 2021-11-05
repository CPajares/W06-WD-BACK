const express = require("express");
const getRobots = require("../controller/robotController");

const router = express.Router();

router.get("/", getRobots);

module.exports = router;
