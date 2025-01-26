const { city } = require("../models/index");
const { Op } = require("sequelize");

const AirportRepository = require("./airport-repository");
const airportRepository = new AirportRepository();

class CityRepository {
  async createCity({ name }) {
    try {
      console.log(name);
      const response = await city.create(name);
      return response;
    } catch (error) {
      console.log("Something went wrong in repository", error);
    }
  }

  async getAllCity(filter) {
    try {
      if (filter.name) {
        const FilterCities = await city.findAll({
          where: {
            name: {
              [Op.substring]: filter.name,
            },
          },
        });
        return FilterCities;
      }
      const getAllCity = await city.findAll();
      return getAllCity;
    } catch (error) {
      console.log("Something went wrong in repository", error);
    }
  }

  async getByName(name) {
    try {
        const response = await city.findAll({
         where :{
          name : name
         }
        })
        return  response;
    } catch (error) {
      console.log("Something went wrong in repository", error);
    }
  }

  async getByPk(id){
    try {
        const response = await city.findByPk(id);
        return response;
    } catch (error) {
      console.log("Something went wrong in repository", error);
    }
  }

  async updateCity(id, data) {
    try {
      const cityToUpdate = await city.findByPk(id);
      if (!cityToUpdate) throw new Error("City not found");
      const updatedCity = await cityToUpdate.update(data);
      return updatedCity;
    } catch (error) {
      console.log("Something went wrong in repository", error);
    }
  }

    async deleteCity(id){
      try {
        const cityToDelete = await city.findByPk(id);
        if (!cityToDelete) throw new Error("City not found");
        await cityToDelete.destroy();
        return true;
      } catch (error) {
        console.log("Something went wrong in repository", error);
        return false;
      }
    }

    async getByCityName(cityName){
      try {
        const getAllCityData = await city.findAll({
          where: {
            name: cityName,
          },
        });
        console.log(getAllCityData);
        var cityID = (getAllCityData[0].id);
        var getAirportData = await airportRepository.getByCityID(cityID);
        return getAirportData;
      } catch (error) {
        console.log("Something went wrong when getting Airports by city name", error);
      }
    }
}

module.exports = CityRepository;
