const express = require("express");
const router = express.Router();
const multer = require("multer");


const cityController = require("../../controllers/city-Controller");
const userController = require("../../controllers/user-Controler");
// const AirplaneRepository = require("../../controllers/airplane-Controllers");
const AirplaneRepository = require("../../controllers/airplane-controllers")
const auth_middleWare = require("../../middlewares/auth-middleware")
const airportController = require("../../controllers/airport-controllers");
const storage = require("../../middlewares/airline-Logo-Middleware");
const FLightScheduleController = require("../../controllers/flight-schedule-controllers")
const ScheduleFlightList = require("../../controllers/schedule-flight-list-controller")
const FilterFlightMiddleware = require("../../middlewares/flight-filter-middleware");
const SendMail= require("../../controllers/Email-controller")
const SeatController = require("../../controllers/create-seats-controller")
const FLightSeatController = require("../../controllers/flight-seat-controller");

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

// http://localhost:4000/api/v1/getByEmail/:email
router.get("/getByEmail/:email", userController.getByEmail);

// http://localhost:4000/api/v1/getuserby/:id   [get user by id]
router.get('/getuserby/:id' ,userController.getUserById )


// http://localhost:4000/api/v1/updatePassword
router.patch('/updatepassword', userController.updatePassword)



// {-------   Airplane routes  -------}

const upload = multer({ storage});

// http://localhost:4000/api/V1/create
router.post("/create", upload.single("flightLogo"), AirplaneRepository.create);

// http://localhost:4000/api/V1/airplaneID
router.delete("/delete/:id", AirplaneRepository.destroy);

// http://localhost:4000/api/V1/airplane/:id
router.get("/airplane/:id", AirplaneRepository.getByPk);

//http://localhost:4000/api/V1/allFlights
router.get("/allFlights", AirplaneRepository.getAll);

// http://localhost:4000/api/V1/updateAirplane/:id
router.patch("/updateAirplane/:id", AirplaneRepository.updateAirplane)

// http://localhost:4000/api/V1/filterFlight
router.get("/filterFlight" ,FilterFlightMiddleware.filterFlight , AirplaneRepository.filterFlightData);

// http://localhost:4000/api/V1/dailyFlights
router.get("/dailyFlights", AirplaneRepository.dailyFlights)

// http://localhost:4000/api/V1/getFlightById
router.get("/getFlightById/:id" , AirplaneRepository.getByFlightId)

// http://localhost:4000/api/V1/allFlightScheduleList    [inner join airplane with schedule list ]
router.get("/allFlightScheduleList", AirplaneRepository.findAllFLightAndSchedule)

// http://localhost:4000/api/V1/allFlightScheduleList/:flightId    [inner join]
router.get("/allFlightScheduleList/:flightId", AirplaneRepository.findAllFLightAndScheduleById)





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




// {----------- Flights Schedule Route --------- }


// http://localhost:4000/api/V1/scheduleFlights
router.post("/scheduleFlights" , FLightScheduleController.create)



// {--------------- Schedule flight list  --------------------}


// http://localhost:4000/api/V1/scheduleflightslist
router.get("/scheduleflightslist", ScheduleFlightList.getFilteredData);

// http://localhost:4000/api/V1/getAllSchedulelists
router.get("/getAllSchedulelists", ScheduleFlightList.getAll);


// http://localhost:4000/api/V1/schedulesListByFlightId/:id
router.get("/schedulesListByFlightId/:id" , ScheduleFlightList.getByFlightId);

// http:localhost:4000/api/V1/distinctScheduleFlights
router.get("/distinctScheduleFlights" , ScheduleFlightList.getDistinctScheduleFlights);

// http://localhost:4000/api/V1/scheduleFlightList/:date
router.get("/scheduleFlightList/:date" , ScheduleFlightList.getByDate);


//  ---------------------------------------------------------------------
//                       Send Email For Forget Password
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// http://localhost:4000/api/V1/sendOtp
router.use("/sendOtp" , SendMail.sendEmailForPasswordForget)



// --------------------------------------------------------------------
//                       Create Seats API
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// http://localhost:4000/api/V1/createseats
router.post("/createseats", SeatController.create);


// http://localhost:4000/api/V1/getseatclass
router.get("/getseatclass" , SeatController.getseatclass);

//http://localhost:4000/api/V1/getseatbyid
router.get("/getseatbyid/:id" , SeatController.getSeatbyid);

// http://localhost:4000/api/V1/getseatsBy/:flight_id
 router.get("/getseatsBy/:flight_id" , SeatController.getSeatsByFlightId);


// --------------------------------------------------------------------
//                       Create Flight seats
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// http://localhost:4000/api/V1/createFLightseats
router.post("/createFLightseats" , FLightSeatController.create);

// http://localhost:4000/api/V1/getFlightSeatsByFlightId/:flight_id/:date
router.get("/getFlightSeatsByFlightId/:flight_id/:date" , FLightSeatController.getFlightSeatsByFlightId);

// http://localhost:4000/api/V1/getAllFlightSeatsBy
 router.get("/getAllFlightSeatsBy" , FLightSeatController.getALlSeats);










module.exports = router;