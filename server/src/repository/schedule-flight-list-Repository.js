const {schedule_list, sequelize}  = require("../models/index");

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

     async getByFlightId(flightId) {
          try {
               const response = await schedule_list.findAll({
                    where: {
                         flight_id: flightId
                    }
               });
               return response;
          } catch (error) {
               console.log("Something went wrong in repository", error);
          }
     }

     async getAllScheduleListFlights (){
          try {
               // const [response] = await sequelize.query("SELECT DISTINCT flight_id,Date,Departure,Arrival,totalTIme,departureTime,arrivalTime FROM schedule_lists")

               const response = await schedule_list.findAll({
                    attributes: ['flight_id', 'Date', 'Departure', 'Arrival', 'totalTIme', 'departureTime', 'arrivalTime','createdAt', 'updatedAt'],
                    group: ['flight_id', 'Date', 'Departure', 'Arrival', 'totalTIme', 'departureTime', 'arrivalTime','createdAt', 'updatedAt']
               });

               // const [response] = await sequelize.query("SELECT distinct flight_id from schedule_lists");
               
               return response;
          } catch (error) {
               console.log("Something went wrong in repository", error);
          }
     }

     async getDailyScheduleList ({date}) {
          try {
               console.log(date);
               const response = await schedule_list.findAll({
                    where : {
                         Date : date,
                    }
               })
               return response;
          } catch (error) {
               return error;
          }
     }
}

module.exports = ScheduleListRepository;