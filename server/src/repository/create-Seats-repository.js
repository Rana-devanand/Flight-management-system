const {SeatTypes} = require("../models/index");

class CreateSeats_Repository {
     async create(data) {
          try {
               console.log("Repository created", data);
               const  response = await SeatTypes.create(data);
               return response;
          } catch (error) {
               console.error(error);
               return error;
          }
     }

     async getSeatClass () {
          try {
               const response = await SeatTypes.findAll();
               return response;
          } catch (error) {
               console.error(error);
               return error;
          }
     } 

     async getSeatById(id){
          try {
               const response = await SeatTypes.findByPk(id);
               return response;
          } catch (error) {
               console.error(error);
               return error;
          }
     }
     async getSeatByFlightId (flightid){
          try {
               const response = await SeatTypes.findAll({
                    where : {
                         flight_id : flightid
                    }
               });
               return response;
          } catch (error) {
               console.error(error);
               return error;
          }
     }
}


module.exports = CreateSeats_Repository;