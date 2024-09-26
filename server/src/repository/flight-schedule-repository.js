const {flight_schedule} = require("../models/index");
const {schedule_list} = require("../models/index")

class FLightSchedule_Repository {
     async createFlightSchedule(data) {
          try {
               const scheduleFlights = await flight_schedule.create(data);
               console.log(data);
               let startDate = new Date(data.start_date);
               let endDate = new Date(data.end_date);

               // Add the created schedule to the date range of flights.
               if(data.recurrence_pattern === "Alternative"){
                    // let currentDate = new Date(startDate);
                    while(startDate <= endDate){
                         await schedule_list.create(
                              {
                                   flight_id : data.flight_id,
                                   Date : startDate.toISOString().split('T')[0],
                                   Departure : data.departure_time,
                                   Arrival : data.arrival_time,
                                   Total_seats : data.available_seats,
                                   createdAt : new Date(),
                                   updatedAt : new Date(),
                              });
                              startDate.setDate(startDate.getDate() + 3);
                    }
               }

               return scheduleFlights;
          } catch (error) {
               console.error(error);
               throw {error};
          }
     
     }
}

module.exports = FLightSchedule_Repository;