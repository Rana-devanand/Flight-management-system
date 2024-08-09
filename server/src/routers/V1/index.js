const express = require("express");
const router = express.Router();

const cityController = require("../../controllers/city-Controller");

router.post("/createCity", cityController.create);

module.exports = router;
