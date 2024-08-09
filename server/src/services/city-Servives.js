const CityRepository = require("../repository/City-repository");

class CityService {
  constructor() {
    this.CityRepository = new CityRepository();
  }

  async createCity(data) {
    try {
      const city = await this.CityRepository.createCity(data);
      return city;
    } catch (error) {
      console.log("Something went wrong in service", error);
    }
  }
}
module.exports = CityService;
