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
}

module.exports = ScheduleListServices;