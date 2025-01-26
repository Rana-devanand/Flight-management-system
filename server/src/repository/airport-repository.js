const { airport } = require("../models/index");
const { Op } = require("sequelize");
``;
class AirportRepository {
  async create(data) {
    try {
      console.log("Repository created", data);
      const createAirport = await airport.create(data);
      return createAirport;
    } catch (error) {
      console.error("something went wrong creating Airport", error);
      throw error;
    }
  }

  async updateAirport(airportId, data) {
    try {
      const updateAirports = await airport.findByPk(airportId);
      // updateAirports.name = airportName.name;
      // await updateAirports.save();
      if(!updateAirports)  throw new Error("Airport not found")
      const response = await updateAirports.update(data);
      return response;
    } catch (error) {
      console.error("Something went wrong updating the airport ", error);
    }
  }

  async deleteAirport(AirportId) {
    try {
      const deleteAirport = await airport.destroy({
        where: {
          id: AirportId,
        },
      });
      return deleteAirport;
    } catch (error) {
      console.log("Something went wrong with deleteAirport -", error);
    }
  }

  async getAirportByID(AirportId) {
    try {
      const getAirport = await airport.findByPk(AirportId);
      return getAirport;
    } catch (error) {
      console.log("Something went wrong with getAirport -", error);
    }
  }

  async getAllAirport(filter) {
    try {
      if(filter.name)
      {
          const filterAirport = await airport.findAll({
               where: {
                 name: {
                   [Op.substring]: filter.name,
                 },
               },
             });
             return filterAirport;
      }
      const getAll = await airport.findAll();
      return getAll;
    } catch (error) {
      console.log("something went wrong when getting all Airports", error);
    }
  }
  async getByCityID(cityId) {
    try {
      const getAirports = await airport.findAll({
        where: {
          cityId,
        },
      });
      return getAirports;
    } catch (error) {
      console.log("Something went wrong with getAirports by City ID", error);
    }
  }
}

module.exports = AirportRepository;
