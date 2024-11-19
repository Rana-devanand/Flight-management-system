const FlightSeatServices = require("../services/create-flight-seats-sevrices");

const flightSeatServices = new FlightSeatServices();

const create = async (req, res) => {
     try {
          const response = await flightSeatServices.createFlightSeatsService(req.body);
          return res.status(200).json({
               data : response,
               message : "Successfully created the Seats",
               success : true,
               err : {}
          })
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               data : "",
               message : "Failed to create the Seats",
               success : true,
               err : error
          })
     }
}  

module.exports ={
     create,
}