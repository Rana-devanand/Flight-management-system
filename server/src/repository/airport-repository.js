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
}

module.exports = AirportRepository;