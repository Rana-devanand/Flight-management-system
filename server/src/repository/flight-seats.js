const {Seat, Sequelize} = require("../models/index");
const {SeatTypes} = require("../models/index");
const { Op ,fn , col} = require("sequelize");
// const moment = require('moment');
const moment = require('moment-timezone');

class CreateFLightSeats_Repository {

     async  generateSeats  (startDate , endDate , flightId, flightRecurrence , seatTypeId, totalSeats, seatsPerRow) {
          let seats = [];
          let rowCount = Math.ceil(totalSeats / seatsPerRow);
          console.log("rowCount", rowCount);

          let Start_Date = new Date(startDate);
          let End_Date = new Date(endDate);
          let FLight_Recurrence = parseInt(flightRecurrence);

          while(Start_Date <= End_Date){   
               console.log(Start_Date);
               let row = 1;
               for (row; row <= rowCount; row++) {
                         let col = 1;       
                         for (col; col <= seatsPerRow; col++) {
                             const response = await Seat.create({
                                   Flight_Date : Start_Date,
                                   flight_id: flightId,
                                   seat_type_id: seatTypeId,
                                   seat_number: `${String.fromCharCode(64 + row)}${col}` ,
                                   is_Booked: false
                              });
                             seats.push(response)
                         }
                    }
               Start_Date.setDate(Start_Date.getDate() + FLight_Recurrence);
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
               const response = await this.generateSeats(data.startDate , data.EndDate, data.flight,data.flightRecurrence , data.seatClass ,total_seats ,seats_per_row);
               // console.log(response);
               return response;
          } catch (error) {
               console.error(error);
          }
     }

     

     async getFlightSeatsByFlightId(flight_id, date) {
          try {
               const newDate = new Date(date);
               const formattedDate = newDate.toISOString().replace('T', ' ').slice(0,19);
               
               const response = await Seat.findAll({
                    where: {
                         flight_id: flight_id,
                         flight_Date: formattedDate
                    }
               });
               
               return response;
          } catch (error) {
               console.error('Error fetching flight seats:', error);
               throw error;
          }
     }

     async getAllFlightsSeats(){
          try {
               const response = await Seat.findAll();
               return response;
          } catch (error) {
               throw {Error};
          }
     }
}

module.exports = CreateFLightSeats_Repository;

