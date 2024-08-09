const express = require("express");
const router = express.Router();

const cityController = require("../../controllers/city-Controller");

router.post("/createCity", cityController.create);
router.get("/allCity", cityController.getAllCity);

module.exports = router;
