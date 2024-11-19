const {Seat} = require("../models/index");
const {SeatTypes} = require("../models/index");

class CreateFLightSeats_Repository {

     async  generateSeats  (flightId, seatTypeId, totalSeats, seatsPerRow) {
          let seats = [];
          let rowCount = Math.ceil(totalSeats / seatsPerRow);
          for (let row = 1; row <= rowCount; row++) {
              for (let col = 1; col <= seatsPerRow && seats.length < totalSeats; col++) {
                 await Seat.create({
                      flight_id: flightId,
                      seat_type_id: seatTypeId,
                      seat_number: `${String.fromCharCode(64 + row)}${col}` ,
                      is_Booked: false
                  });
              }
          }
          return seats;
      };
     
     async create (data) {
          try {

               console.log(data);
               const seat_type =   await SeatTypes.findByPk(data.seatClass);

               const seats_per_row = seat_type.dataValues.seats_per_row;
               const total_seats = seat_type.dataValues.total_seats;
               
               // Generate seats for the given flight and seat type
               const response = await this.generateSeats(data.flight,data.seatClass,total_seats ,seats_per_row);
               return response;
          } catch (error) {
               console.error(error);
          }
     }
}

module.exports = CreateFLightSeats_Repository;