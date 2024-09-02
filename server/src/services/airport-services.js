const AirportRepository = require("../repository/airport-repository");

class AirportServices {
     constructor() {
          this.airportRepository = new AirportRepository();
     }

     async createAirportService(data) {
          try {
               console.log("AirportService", data);
               const createAirport = await this.airportRepository.create(data);
               return createAirport;
          } catch (error) {
               console.error("Error creating AirportService in Services");
               throw error;
          }
     }
}

module.exports = AirportServices;
