const AirplaneServices = require("../services/airplane-services");

const airplaneServices = new AirplaneServices();
const create = async (req, res) => {
     try {
          console.log("controllers : ", req.body);
          const response = await airplaneServices.createAirplaneService(req.body);
          return res.status(200).json({
               data: response,
               message: 'Airplane created successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          console.log("Error creating Airplane service ", error);
          return res.status(500).json({
               data: {},
               message: 'Error creating Airplane service',
               messageType: 'error',
               error: error.message || error.toString()
          });
     }
}

const destroy = async (req, res) => {
     try {
          const response = await airplaneServices.deleteAirplaneService(req.params.id);
          return res.status(200).json({
               data: response,
               message: 'Airplane deleted successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          console.log("Error deleting Airplane service ", error);
          return res.status(500).json({
               data: {},
               message: 'Error deleting Airplane service',
               messageType: 'error',
               error: error,
          })
     }
}

const getByPk = async (req, res) => {
     try {
          const response = await airplaneServices.getAirplaneByPK(req.params.id);
          return res.status(200).json({
               data: response,
               message: 'Airplane fetched successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          console.log("Error to get Airplane By ID", error);
          return res.status(500).json({
               data: {},
               message: 'Error fetching Airplane',
               messageType: 'error',
               error: error,
          })
     }
}

const getAll = async (req, res) => {
     try {
          const response = await airplaneServices.getAllFLights(req.query);
          return res.status(200).json({
               data: response,
               message: 'All Airplanes fetched successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               data: {},
               message: 'Error fetching all Airplanes',
               messageType: 'error',
               error: error,
          })
     }
}

const updateAirplane = async (req, res) => {
     try {
          console.log(req.params.id);
          console.log("Data come : " ,req.body)
          const response = await airplaneServices.updateFlightByPk(req.params.id, req.body);
          return res.status(200).json({
               data: response,
               message: 'Airplane updated successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               data: {},
               message: 'Error update Flight',
               messageType: 'error',
               error: error,
          })
     }

}

const filterFlightData = async (req, res) =>{
     try {
          console.log("controller : ",req.params);
          const response = await airplaneServices.fetchFilterFlightData(req.query);
          // console.log(response);
          return res.status(200).json({
               data: response,
               message: 'Flight data fetched successfully',
               success: true,
               error: {}
          })
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               data: {},
               message: 'Error fetching flight data',
               messageType: 'error',
               error: error,
          })
     }
}

module.exports = {
     create,
     destroy,
     getByPk,
     getAll,
     updateAirplane,
     filterFlightData
}