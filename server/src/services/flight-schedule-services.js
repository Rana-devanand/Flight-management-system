const FLightSchedule_Repository = require("../repository/flight-schedule-repository");


class FlightScheduleService {

     constructor() {
          this.flightScheduleRepository = new FLightSchedule_Repository();
     }

     async createFlightScheduleService(data) {
          try {
               console.log("FlightScheduleService", data);
               const createFlightSchedule = await this.flightScheduleRepository.createFlightSchedule(data);
               return createFlightSchedule;
          } catch (error) {
               console.error("Error creating FlightScheduleService in Services");
               throw error;
          }
     }

}

module.exports = FlightScheduleService;