const { city } = require("../models/index");
const { Op } = require("sequelize");

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

}

module.exports = CityRepository;
