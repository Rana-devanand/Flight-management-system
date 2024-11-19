const FlightSeatsRepository = require("../repository/flight-seats");

class FLightSeatsServices {
     constructor(){
          this.flightSeatsRepository = new FlightSeatsRepository();
     }

     async createFlightSeatsService(data){
          try {
               console.log("Creating flight in services" , data);
               const response = await this.flightSeatsRepository.create(data);
               return response;
          } catch (error) {
               console.log("Error in service" , error);
               return error;
          }
     }
}

module.exports = FLightSeatsServices;