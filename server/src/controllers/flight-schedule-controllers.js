const FlightScheduleService = require("../services/flight-schedule-services");

const flightScheduleService = new FlightScheduleService();

const create = async (req, res) => {
     try {
          const response = await flightScheduleService.createFlightScheduleService(req.body);
          return res.status(201).json({
               data: response,
               message: "Flight Schedule created successfully",
               success: true,
               error: {},
          })
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               data: {},
               message: "Failed to create the Flight Schedule",
               success: false,
               error: error,
          })
     }
}

module.exports = {
     create,
}