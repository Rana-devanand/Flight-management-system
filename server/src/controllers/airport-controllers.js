const AirportServices = require("../services/airport-services");

const airportServices = new AirportServices();

const create = async (req, res) => {
     try {
          console.log("Controllers : ", req.body);
          const response = await airportServices.createAirportService(req.body);
          return res.status(200).json({
               data: response,
               message: "Airport created successfully",
               success: true,
               err: {}
          })
     } catch (error) {
          console.error("Error creating Airport controller", error);
          return res.status(500).json({
               data: {},
               message: "Failed to create the Airport",
               success: false,
               err: error,
          })
     }
}

module.exports = {
     create,
}