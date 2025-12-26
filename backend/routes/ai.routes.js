const express = require("express");
const router = express.Router();
const { askAI } = require("../controllers/ai.controller");

router.post("/query", askAI);

module.exports = router;
