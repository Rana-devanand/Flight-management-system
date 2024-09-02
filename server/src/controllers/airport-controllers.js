const AirportServices = require("../services/airport-services");

const airportServices = new AirportServices();

const create = async (req, res) => {
     try {
          console.log("Controllers : ", req.body);
          const response = await airportServices.createAirportService(req.body);
          return res.status(200).json({
               data: response,
               message: "Airport created successfully",
               success: true,
               err: {}
          })
     } catch (error) {
          console.error("Error creating Airport controller", error);
          return res.status(500).json({
               data: {},
               message: "Failed to create the Airport",
               success: false,
               err: error,
          })
     }
}

const getAll = async (req, res) => {
     try {
          const response = await airportServices.getAllAirports();
          return res.status(200).json({
               data : response,
               message: "Success getting all Airports",
               success: true,
               err: {}
          })
     } catch (error) {
          console.error("Error getall Airport controller", error);
          return res.status(500).json({
               data: {},
               message: "Failed to get all Airport",
               success: false,
               err: error,
          })
     }
}

const getById = async (req, res) => {
     try {
          const response = await airportServices.getAirportById(req.params.id);
          return res.status(200).json({
               data : response,
               message : "successfully retrieved the airport",
               success : true,
               err : {}
          })
     } catch (error) {
          console.error("Error get by Id Airport ", error);
          return res.status(500).json({
               data: {},
               message: "Failed to get all Airport",
               success: false,
               err: error,
          })
     }
}

const update = async (req,res) => {
     try {
          const response = await airportServices.updateAirport(
               req.params.id,
               req.body
          );
          return res.status(200).json({
               data: response,
               message: "Airport updated successfully",
               success: true,
               err: {}
          })
     } catch (error) {
          console.error("Error update Airport controller", error);
          return res.status(500).json({
               data: {},
               message: "Failed to update the Airport",
               success: false,
               err: error,
          })
     }
}

const destroy = async(req, res) =>{
     try {
          const response = await airportServices.deleteAirport(req.params.id);
          return res.status(200).json({
               data: response,
               message: "Airport deleted successfully",
               success : true,
               err : {}
          })
     } catch (error) {
          console.error("Error delete Airport controller", error);
          return res.status(500).json({
               data: {},
               message: "Failed to update the Airport",
               success: false,
               err: error,
          })
     }
}

module.exports = {
     create,
     getAll,
     getById,
     update,
     destroy
}