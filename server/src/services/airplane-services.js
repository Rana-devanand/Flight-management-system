const { update } = require("../controllers/airport-controllers");
const AirplaneRepository = require("../repository/airplane-repository")

class AirplaneServices {

     constructor() {
          this.airplaneRepository = new AirplaneRepository();
     }

     async createAirplaneService(data) {
          try {
               const AirplaneServices = await this.airplaneRepository.create(data);
               return AirplaneServices;
          } catch (error) {
               console.error("Error creating AirplaneService in Services");
               throw error;
          }
     }

     async deleteAirplaneService(airplaneId) {
          try {
               const deletedAirplaneServices = await this.airplaneRepository.deleteAirplane(airplaneId);
               return deletedAirplaneServices;
          } catch (error) {
               console.error("Error deleting AirplaneService in Services");
               throw error;
          }
     }

     async getAirplaneByPK(airplaneId) {
          try {
               const fetchedAirplaneServices = await this.airplaneRepository.airplaneById(airplaneId);
               return fetchedAirplaneServices;
          } catch (error) {
               console.error("Error to find By PK AirplaneService in Services");
               throw error;
          }
     }

     async getAllFLights(filter) {
          try {
               const allFlights = await this.airplaneRepository.allFLights({
                    Airline : filter.Airline
               });
               return allFlights;
          } catch (error) {
               console.error("Error to get all Flights in Services");
               throw error;
          }
     }

     async updateFlightByPk(id , data) {
          try {
               const updateFLight = await this.airplaneRepository.updateFlightByPk(id, data);
               return updateFLight; 
          } catch (error) {
               console.error("Error to update Flight in Services");
               throw error;
          }
     }

     async fetchFilterFlightData(filter){
          try {
               console.log("services : " , filter)
               const flightData = await this.airplaneRepository.fetchFilterFlightData(filter);
               return flightData;
          } catch (error) {
               console.error("Error to Fetch Flight in Services");
               throw error;
          }
     }
}

module.exports = AirplaneServices;