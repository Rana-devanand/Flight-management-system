const { airplanes , schedule_list} = require("../models/index")
const { Op } = require("sequelize");
const ScheduleListRepository = require("../repository/schedule-flight-list-Repository")

class AirplaneRepository {
     constructor() {
          this.scheduleListRepository = new ScheduleListRepository();
     }
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

     async fetchFilterFlightData(filter) {
          try {
               console.log("Fetching in Repo ", filter); 
               const flight = await airplanes.findAll({
                    where : {
                         Departure : filter.Departure,
                         Arrival : filter.Arrival,
                         // Remark : filter.Date
                    }
               })
               // console.log(flight)
               let i= 0;
               // for (const element of flight) { 
               //      // console.log(element.flight_id);
               //      let response = await this.scheduleListRepository.getScheduleFlights(element.flight_id, filter.Date)

               //      // console.log(response);
               //      let flight_id = response[0].flight_id;
               //      let flightResponse  = await this.getFlightById(flight_id);
               //      if(flightResponse){
               //           console.log("hook");
               //           flights.push(flightResponse);
               //      }else{
               //           console.log("Flight not found for");
               //           continue;
               //      }
               //      // console.log(flightResponse);


               //           // return flightResponse;
               //           // console.log(i++);

               // };

               // Ensure flights is initialized as an array
               let flights = [];

               for (let i = 0; i < flight.length; i++) {
               try {
                    // Get the schedule of flights
                    let response = await this.scheduleListRepository.getScheduleFlights(flight[i].flight_id, filter.Date);

                    // Check if response has data
                    if (response && response.length > 0) {
                         let flight_id = response[0].flight_id;

                         // Fetch flight details by ID
                         let flightResponse = await this.getFlightById(flight_id);

                         // Log flight response for debugging
                         console.log(flightResponse);

                         // Push the flightResponse to flights array if valid
                         if (flightResponse) {
                              flights.push(response); // Use push to add the object to the array
                         } else {
                              console.log("Flight not found for flight_id:", flight_id);
                              continue; // Continue to the next iteration if no flightResponse
                         }
                    } else {
                         console.log("No schedule found for flight_id:", flight[i].flight_id);
                         continue;
                    }
               } catch (error) {
                    // Handle any errors that occur in the loop
                    console.error("Error processing flight_id:", flight[i].flight_id, error.message);
                    continue; // Skip this flight and move to the next one
               }
               }

               // After the loop, you should have all valid flight responses stored in the flights array
               // console.log(flights);


               // console.log(flightResponses)
               return flights;
          } catch (error) {
               console.error("Failed to get flight from database " + error.message);
          }
     }

     async getDailyFlights(){
          try {
               const flight = await airplanes.findAll({
                    where : {
                         Remark : { [Op.substring]: "Daily" }
                    }
               })
               return flight;
          } catch (error) {
          console.log("Failed to get flight from database " + error.message); 
          }
     }

     async getFlightById (flightId) {
          try {
              const flightById = await airplanes.findAll({
               where : {
                    flight_id : flightId
               }
              }) 
              return flightById;
          } catch (error) {
               console.error("Failed to get flight from database " + error.message);
          }
     }
     async getAllInnerJoinFlights(){
          try {
               const flight = await airplanes.findAll({
                    include: [{
                         model: schedule_list,
                         required : true,
                    }]
               }) 
               return flight;
          } catch (error) {
          console.log("Failed to get flight from database " + error.message); 
          }
     }
     async getAllFlightAndScheduleById(flightId){
          try {
               const flight = await airplanes.findAll({
                    where : {
                         flight_id : flightId
                    },
                    include: [{
                         model: schedule_list,
                         required : true,
                    }]
               }) 
               return flight;
          } catch (error) {
          console.log("Failed to get flight from database " + error.message); 
          }
     }
}

module.exports = AirplaneRepository;