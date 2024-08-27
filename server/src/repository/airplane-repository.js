const { airplanes } = require("../models/index")

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
}


module.exports = AirplaneRepository;