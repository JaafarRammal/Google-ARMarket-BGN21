const express = require("express");

const TestController = require("../controllers/TestController");

const router = express.Router();

router.get("/tests", TestController.getTests);
router.get("/tests/:id", TestController.getTest);

module.exports = router;
