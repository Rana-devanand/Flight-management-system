const ScheduleListServices  = require('../services/schedule-Flight-List-services');

const scheduleListServices = new ScheduleListServices();

const getAll = async (req, res) => {
     try {
          const response = await scheduleListServices.getAllScheduleList();
          return res.status(200).json({
               data: response,
               message: 'All schedule flights fetched successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          return res.status(500).json({
               data: {},
               message: 'Error fetching all schedule flights',
               success: false,
               error: error,
          })
     }
}


const getFilteredData = async (req, res) => {
     try {
          const response = await scheduleListServices.getScheduleFlightsService(req.query);
          return res.status(200).json({
               data: response,
               message: 'Filtered schedule flights fetched successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          return res.status(500).json({
               data: {},
               message: 'Error fetching filtered schedule flights',
               success: false,
               error: error,
          })
     }
}
const getByFlightId = async (req, res) => {
     try {
          const response = await scheduleListServices.getByFlightId(req.params.id);
          return res.status(200).json({
               data: response,
               message: 'Schedule flight fetched successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          return res.status(500).json({
               data: {},
               message: 'Error fetching schedule flight',
               success: false,
               error: error,
          })
     }
}

const getDistinctScheduleFlights = async(req,res) =>{
     try {
          const response = await scheduleListServices.getAllScheduleListFLights();
          return res.status(200).json({
               data: response,
               message: 'Distinct schedule flights fetched successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               data: {},
               message: 'Error fetching distinct schedule flights',
               success: false,
               error: error,
          })
     }
}

module.exports = {
     getFilteredData,
     getAll,
     getByFlightId,
     getDistinctScheduleFlights
}
