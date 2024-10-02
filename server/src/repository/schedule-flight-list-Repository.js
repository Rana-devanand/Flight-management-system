const {schedule_list}  = require("../models/index");

class ScheduleListRepository {

     async getAll(){
          try {
               const getAllFlightList = await schedule_list.findAll();
               return getAllFlightList;
          } catch (error) {
               console.error(error);
          }
     }
     async getScheduleFlights(flightId , Date) {
          try {
               // console.log(filterData)
               const response = await schedule_list.findAll({
                    where: {
                         flight_id: flightId,
                         Date: Date
                    }
               });
               return response;
          } catch (error) {
               console.log("Something went wrong in repository", error);
          }
     }
}

module.exports = ScheduleListRepository;