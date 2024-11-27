const ScheduleListRepository = require("../repository/schedule-flight-list-Repository")

class ScheduleListServices {
     constructor() {
          this.scheduleListRepository = new ScheduleListRepository();
     }
     async getAllScheduleList(){
          try {
               const scheduleList = await this.scheduleListRepository.getAll();
               return scheduleList;
          } catch (error) {
               console.error("Error getting getAllScheduleList in Services");
          }
     }

     async getScheduleFlightsService(filterData) {
          try {
               const scheduleFlights = await this.scheduleListRepository.getScheduleFlights(filterData);
               return scheduleFlights;
          } catch (error) {
               console.error("Error getting ScheduleFlightsService in Services");
          }
     }

     async getByFlightId(flightId) {
          try {
               const flightsByFlightId = await this.scheduleListRepository.getByFlightId(flightId);
               return flightsByFlightId; 
          } catch (error) {
               console.error("Error to Fetch Daily Flights in Services");
               throw error;
          }
     }

     async getAllScheduleListFLights(){
          try {
               const response = await this.scheduleListRepository.getAllScheduleListFlights();
               return response;
          } catch (error) {
               console.error("Error getting AllScheduleListFlights in Services");
          }
     }
     async getAllScheduleListbyDate(date){
          try {
               const response = await this.scheduleListRepository.getDailyScheduleList(date);
               return response;
          } catch (error) {
               console.error("Error getting DailyScheduleList in Services");
          }
     }
}

module.exports = ScheduleListServices;