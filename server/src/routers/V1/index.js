const express = require("express");
const router = express.Router();

const cityController = require("../../controllers/city-Controller");
const userController = require("../../controllers/user-Controler");
const AirplaneRepository = require("../../controllers/airplane-Controllers");
const auth_middleWare = require("../../middlewares/auth-middleware")
const airportController = require("../../controllers/airport-controllers");

// http://localhost:4000/api/V1/createCity
router.post("/createCity", cityController.create);

// http://localhost:4000/api/V1/allCity
router.get("/allCity", cityController.getAllCity);

// http://localhost:4000/api/V1/cityByName
router.get("/cityByName/:name", cityController.getByName);

// http://localhost:4000/api/V1/city/:cityId
router.get("/city/:id", cityController.getByPk);

// http://localhost:4000/api/V1/updateCity/:cityId
router.patch("/updateCity/:id", cityController.updateCity)

// http://localhost/4000/api/V1/deleteCity/:id
router.delete("/deleteCity/:id", cityController.destroy)


// {------- Users routes  --------}

// http://localhost:4000/api/V1/createUser
router.post("/createUser", userController.create)

// http://localhost:4000/api/V1/users
router.get("/users", userController.get);

// http://localhost:4000/api/V1/signIn
router.post("/signIn",
     auth_middleWare.ValidateUserAuth,
     userController.signIn
);

// http://localhost:4000/api/V1/getByEmail
router.get("/getByEmail", userController.getByEmail);


// {-------   Airplane routes  -------}

// http://localhost:4000/api/V1/create
router.post("/create", AirplaneRepository.create);

// http://localhost:4000/api/V1/airplaneID
router.delete("/delete/:id", AirplaneRepository.destroy);

// http://localhost:4000/api/V1/airplane/:id
router.get("/airplane/:id", AirplaneRepository.getByPk);

//http://localhost:4000/api/V1/allFlights
router.get("/allFlights", AirplaneRepository.getAll);

// http://localhost:4000/api/V1/updateAirplane/:id
router.patch("/updateAirplane/:id", AirplaneRepository.updateAirplane)

// http://localhost:4000/api/V1/filterFlight
router.get("/filterFlight" , AirplaneRepository.filterFlightData);

// http://localhost:4000/api/V1/dailyFlights
router.get("/dailyFlights", AirplaneRepository.dailyFlights)







// {--------- Airport routes ------------}

// http://localhost:4000/api/V1/createAirport
router.post("/createAirport", airportController.create);

// http://localhost:4000/api/V1/allAirports
router.get("/allAirports", airportController.getAll);

// http://localhost:4000/api/V1/getAirport/:id
router.get("/getAirport/:id", airportController.getById);

// http://localhost:4000/api/V1/updateAirport/:id
router.patch("/updateAirport/:id", airportController.update);

// http://localhost:4000/api/V1/deleteAirport/:id
router.delete("/deleteAirport/:id", airportController.destroy)

module.exports = router;
