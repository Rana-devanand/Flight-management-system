const CityRepository = require("../repository/City-repository");

class CityService {
  constructor() {
    this.CityRepository = new CityRepository();
  }

  async createCity(data) {
    try {
      console.log(data)
      const city = await this.CityRepository.createCity(data);
      return city;
    } catch (error) {
      console.log("Something went wrong in service", error);
    }
  }

  async getAllCity(filter) {
    try {
      const AllCity = await this.CityRepository.getAllCity({
        name: filter.name,
      });
      return AllCity;
    } catch (error) {
      console.log("Something went wrong in service", error);
    }
  }

  async getByName(name) {
    try {
      const allCities = await this.CityRepository.getByName(name);
      return allCities;
    } catch (error) {
      console.log("Something went wrong in service", error);
    }
  }

  async getCityByPk(id){
    try {
      const city = await this.CityRepository.getByPk(id);
      return city;
    } catch (error) {
      console.log("Something went wrong in service", error);
    }
  }

  async updateCity(id, data) {
    try {
      const city = await this.CityRepository.updateCity(id, data);
      return city;
    } catch (error) {
      console.log("Something went wrong in service", error);
    }
  }

  async deleteCity(id) {
    try {
      const deleteCityRequest = await this.CityRepository.deleteCity(id);
      return deleteCityRequest;
    } catch (error) {
        console.log("Something went wrong when deleting city", error);
    }
  }

  async getByCityName(cityName){
    try {
      const city = await this.CityRepository.getByCityName(cityName);
      return city;
    } catch (error) {
      console.log("Something went wrong in service", error);
    }
  }
}
module.exports = CityService;
