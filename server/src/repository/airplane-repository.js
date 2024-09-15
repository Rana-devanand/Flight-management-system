const { airplanes } = require("../models/index")
const { Op } = require("sequelize");

class AirplaneRepository {
     async create(data) {
          try {
               console.log("Repository created", data)
               const CreateAirplane = await airplanes.create(data);
               return CreateAirplane;
          } catch (error) {
               console.error("something went wrong creating Airplane", error);
               throw error;
          }
     }

     async deleteAirplane(airplaneId) {
          try {
               console.log("Repository deleted airplane")
               const deletedAirplane = await airplanes.destroy({
                    where: {
                         id: airplaneId,
                    }
               });
               return deletedAirplane;
          } catch (error) {
               console.error("something went wrong on repository deleting Airplane", error);
               throw error;
          }
     }
     async airplaneById(airplaneId) {
          try {
               const getAirplaneById = await airplanes.findByPk(airplaneId);
               return getAirplaneById;
          } catch (error) {
               console.error("something went wrong on repository deleting Airplane", error);
               throw error;
          }
     }

     async allFLights(filter){
          try {
               if(filter.Airline){
                    const getFilteredData = await airplanes.findAll({
                         where :{
                              Airline : {
                                   [Op.substring] : filter.Airline 
                              },    
                         }
                    });
                    return getFilteredData;
               }
               const allAirports = await airplanes.findAll();
               return allAirports;
          } catch (error) {
               console.error("something went wrong on repository fetching Airplane", error);
               throw error;
          }
     }

     async updateFlightByPk(id , data){
          try {
               console.log("repo data : ", data);
               const flight = await airplanes.findByPk(id);
               if(!flight){
                    throw new Error("Flight not found");
               }
               const updatedFlight = await flight.update(data);
               return updatedFlight;
          } catch (error) {
               console.error("Something went wrong on repository updating Airplane", error);
          }
     }
}


module.exports = AirplaneRepository;