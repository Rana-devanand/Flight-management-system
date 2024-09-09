const express = require("express");
const router = express.Router();

const cityController = require("../../controllers/city-Controller");
const userController = require("../../controllers/user-Controler");
const AirplaneRepository = require("../../controllers/airplane-Controllers");
const auth_middleWare = require("../../middlewares/auth-middleware")
const airportController = require("../../controllers/airport-controllers");

// localhost:4000/api/V1/createCity
router.post("/createCity", cityController.create);

// localhost:4000/api/V1/allCity
router.get("/allCity", cityController.getAllCity);

// localhost:4000/api/V1/cityByName
router.get("/cityByName/:name", cityController.getByName);


// {------- Users routes  --------}

// localhost:4000/api/V1/createUser
router.post("/createUser", userController.create)

// localhost:4000/api/V1/users
router.get("/users", userController.get);

// localhost:4000/api/V1/signIn
router.post("/signIn",
     auth_middleWare.ValidateUserAuth,
     userController.signIn
);

// localhost:4000/api/V1/getByEmail
router.get("/getByEmail", userController.getByEmail);


// {-------   Airplane routes  -------}

// localhost:4000/api/V1/create
router.post("/create", AirplaneRepository.create);

// localhost:4000/api/V1/airplaneID
router.post("/airplaneID", AirplaneRepository.destroy);

// localhost:4000/api/V1/airplane/:id
router.get("/airplane/:id", AirplaneRepository.getByPk);

//localhost:4000/api/V1/allFlights
router.get("/allFlights", AirplaneRepository.getAll);


// {--------- Airport routes ------------}

// localhost:4000/api/V1/createAirport
router.post("/createAirport", airportController.create);

// localhost:4000/api/V1/allAirports
router.get("/allAirports", airportController.getAll);

// localhost:4000/api/V1/getAirport/:id
router.get("/getAirport/:id", airportController.getById);

// localhost:4000/api/V1/updateAirport/:id
router.patch("/updateAirport/:id", airportController.update);

// localhost:4000/api/V1/deleteAirport/:id
router.delete("/deleteAirport/:id", airportController.destroy)

module.exports = router;
