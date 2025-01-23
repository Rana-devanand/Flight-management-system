const CreateSeats_Repository = require("../repository/create-Seats-repository");

class CreateSeats_Service {
     constructor() {
          this.createSeatsRepository = new CreateSeats_Repository();
     }

     async createSeat (data){
          try {
               const response = await this.createSeatsRepository.create(data);
               return response;
          } catch (error) {
               console.log("Error in Services " . error.message);
               return error;
          }
     }

     async getSeatClass () {
          try {
               const response = await this.createSeatsRepository.getSeatClass();
               return response;
          } catch (error) {
               console.log("Error in Services " . error.message);
               return error;
          }
     }

     async getSeatsPerRow(id){
          try {
               const response = await this.createSeatsRepository.getSeatById(id);
               return response;
          } catch (error) {
               console.log("Error in Services " . error.message);
               return error;
          }
     }
     async getSeatByFlightId (flightId){
          try {
               const response = await this.createSeatsRepository.getSeatByFlightId(flightId);
               return response;
          } catch (error) {
               console.log("Error in Services " . error.message);
               return error;
          }
     }
}

module.exports = CreateSeats_Service;