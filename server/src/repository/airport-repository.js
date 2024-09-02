const { airport } = require("../models/index");

class AirportRepository {
     async create(data) {
          try {
               console.log("Repository created", data)
               const createAirport = await airport.create(data);
               return createAirport;
          } catch (error) {
               console.error("something went wrong creating Airport", error);
               throw error;
          }
     }

     async updateAirport(airportId , airportName){
          try {
               const updateAirports = await airport.findByPk(airportId);
               updateAirports.name = airportName.name;
               await updateAirports.save();
               return updateAirports;
          } catch (error) {
               console.error("Something went wrong updating the airport " , error);
          }
     }

     async deleteAirport(AirportId) {
          try {
               const deleteAirport = await airport.destroy({
                    where : {
                         id :  AirportId,
                    }
               });
               return deleteAirport;
          } catch (error) {
               console.log("Something went wrong with deleteAirport -", error);
          }
     }

     async getAirportByID(AirportId) {
          try {
               const getAirport = await airport.findByPk(AirportId);
               return getAirport;
          } catch (error) {
               console.log("Something went wrong with getAirport -", error);
          }
     }

     async getAllAirport(){
          try {
               const getAll = await airport.findAll();
               return getAll;
          } catch (error) {
               console.log("something went wrong when getting all Airports" , error);
          }
     }
}

module.exports = AirportRepository;