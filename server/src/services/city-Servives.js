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

}
module.exports = CityService;
