const express = require("express");
const router = express.Router();

const cityController = require("../../controllers/city-Controller");
const userController = require("../../controllers/user-Controler");
const AirplaneRepository = require("../../controllers/airplane-Controllers");
const auth_middleWare = require("../../middlewares/auth-middleware")
const airportController = require("../../controllers/airport-controllers");

router.post("/createCity", cityController.create);
router.get("/allCity", cityController.getAllCity);


// {------- Users routes  --------}

//localhost:3000/api/V1/createUser
router.post("/createUser", userController.create)

//localhost:3000/api/V1/users
router.get("/users", userController.get);

// localhost:3000/api/V1/signIn
router.post("/signIn",
     auth_middleWare.ValidateUserAuth,
     userController.signIn
);

// localhost:3000/api/V1/getByEmail
router.get("/getByEmail", userController.getByEmail);


// {-------   Airplane routes  -------}

// // localhost:3000/api/V1/create
router.post("/create", AirplaneRepository.create);

// localhost:3000/api/V1/airplaneID
router.post("/airplaneID", AirplaneRepository.destroy);

// localhost:3000/api/V1/airplane/:id
router.get("/airplane/:id", AirplaneRepository.getByPk);


// {--------- Airport routes ------------}

router.post("/createAirport", airportController.create);

module.exports = router;
