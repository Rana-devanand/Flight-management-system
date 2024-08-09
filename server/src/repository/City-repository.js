const { city } = require("../models/index");

class CityRepository  {
  async createCity({name}) {
    try {
      console.log(name)
      const response = await city.create({
        name,
      });
      return response;
    } catch (error) {
      console.log("Something went wrong in repository", error);
    }
  }
}

module.exports = CityRepository;
