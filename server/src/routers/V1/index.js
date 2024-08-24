const express = require("express");
const router = express.Router();

const cityController = require("../../controllers/city-Controller");
const userController = require("../../controllers/user-Controler");

const auth_middleWare = require("../../middlewares/auth-middleware")

router.post("/createCity", cityController.create);
router.get("/allCity", cityController.getAllCity);


// Users routes :

//localhost:3000/api/V1/createUser
router.post("/createUser", userController.create)

//localhost:3000/api/V1/users
router.get("/users", userController.get);

// localhost:3000/api/V1/signIn
router.post("/signIn",
     auth_middleWare.ValidateUserAuth,
     userController.signIn
);


module.exports = router;
