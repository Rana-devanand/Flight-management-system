const {flight_schedule} = require("../models/index");
const {schedule_list} = require("../models/index")

class FLightSchedule_Repository {
     async createFlightSchedule(data) {
          try {
               console.log("Creating schedule for flight", data);
               const scheduleFlights = await flight_schedule.create(data);
               // console.log(data);
               let startDate = new Date(data.start_date);
               let endDate = new Date(data.end_date);

               let FLight_Recurrence = parseInt(data.recurrence_pattern);

               // Calculate total time difference between departure to arrival.
               const departure = new Date(data.departure_time);
               const arrival = new Date(data.arrival_time);
             
                // Calculate the difference in milliseconds
               const timeDifference = arrival - departure;

               // Convert the difference to total minutes
               const totalMinutes = Math.floor(timeDifference / (1000 * 60));

                // Calculate days, hours, and minutes
               const days = Math.floor(totalMinutes / (60 * 24));
               const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
               const minutes = totalMinutes % 60;

               const totalTimeTakes =  `${days > 0 ? days + "D " : ""}${hours}h ${minutes}min`;
               // console.log(totalTimeTakes);
               // Calculate total time difference in hours.

               let flightHours = departure.getHours();
               const flightMinutes = departure.getMinutes().toString().padStart(2, '0');

               let Arrival_hour = arrival.getHours();
               const Arrival_minutes = arrival.getMinutes().toString().padStart(2, '0');


               // Determine AM/PM and adjust the 24-hour format to 12-hour format
               const ampm = flightHours >= 12 ? 'PM' : 'AM';
               flightHours = flightHours % 12 || 12; // Convert 0 to 12 for midnight

               // Determine AM/PM for arrival and adjust the 24-hour format to 12-hour format
               const arrivalAmpm = Arrival_hour >= 12 ? 'PM' : 'AM';
               Arrival_hour = Arrival_hour % 12 || 12; // Convert 0 to 12 for midnight

               // const arrival_day = Arrival.getDate().toString().padStart(2, '0'); 

               //${departure_day} ${departure_month} ${departure_year} :
               //${Arrival_day} ${Arrival_month} ${Arrival_year} :
               let DepartureTiming = `${flightHours}:${flightMinutes} ${ampm}`;
               let ArrivalTiming = `${Arrival_hour}:${Arrival_minutes} ${arrivalAmpm}`;

               // Add the created schedule to the date range of flights.
               if(FLight_Recurrence){
                    // let currentDate = new Date(startDate);
                    while(startDate <= endDate){
                         // console.log(totalTimeTakes);

                         await schedule_list.create(
                              {
                                   flight_id : data.flight_id,
                                   Date : startDate.toISOString().split('T')[0],
                                   Departure : startDate.toISOString().split('T')[0],
                                   Arrival : startDate.toISOString().split('T')[0],
                                   totalTIme : totalTimeTakes,
                                   departureTime : DepartureTiming,
                                   arrivalTime : ArrivalTiming,
                                   
                                   // Total_seats : data.available_seats,
                                   // createdAt : new Date(),
                                   // updatedAt : new Date(),
                              });
                              startDate.setDate(startDate.getDate() + FLight_Recurrence);
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