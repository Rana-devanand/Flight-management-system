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

     async getAirportById(id) {
          try {
               const getAirportByPk = await this.airportRepository.getAirportByID(id);
               return getAirportByPk;
          } catch (error) {
               console.error("Error getting by ID AirportService in Services");
               throw error;
          }
     }

     async getAllAirports(filter) {
          try {
               const getAllAirports = await this.airportRepository.getAllAirport({
                    name : filter.name
               });
               return getAllAirports;
          } catch (error) {
               console.error("Error getAll AirportService in Services");
               throw error;
          }
     }

     async updateAirport(id, data) {
          try {
               const updateAirport = await this.airportRepository.updateAirport(id, data);
               return updateAirport;
          } catch (error) {
               console.error("Error to update AirportService in Services");
               throw error;
          }
     }

     async deleteAirport(id) {
          try {
               const deleteAirport = await this.airportRepository.deleteAirport(id);
               return deleteAirport;
          } catch (error) {
               console.error("Error to delete the airport in Services");
               throw error;
          }
     }
}

module.exports = AirportServices;
