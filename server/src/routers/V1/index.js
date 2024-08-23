const express = require("express");
const router = express.Router();

const cityController = require("../../controllers/city-Controller");
const userController = require("../../controllers/user-Controler");

router.post("/createCity", cityController.create);
router.get("/allCity", cityController.getAllCity);


// Users routes :

router.post("/createUser", userController.create)

module.exports = router;
