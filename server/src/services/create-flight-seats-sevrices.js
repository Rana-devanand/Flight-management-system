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

     async getFlightSeatsByFlightId (flight_id,date){
          try {
               console.log(flight_id , date);
               const response = await this.flightSeatsRepository.getFlightSeatsByFlightId(flight_id, date);
               return response;
          } catch (error) {
               console.log("Error in Services " , error.message);
               return error;
          }
     }

     async getAllFlightsSeats(){
          try {
               const response = await this.flightSeatsRepository.getAllFlightsSeats();
               return response;
          } catch (error) {
               console.error("Error getting all flights seats in Services");
          }
     }
}

module.exports = FLightSeatsServices;