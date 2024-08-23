const CityService = require("../services/city-Servives");

const cityService = new CityService();

const create = async (req, res) => {
  try {
    const response = await cityService.createCity(req.body);
    return res.status(201).json({
      data: response,
      message: "successFully created city",
      success: true,
      err: {},
    });
  } catch (error) {
    console.error("Something went wrong to create the City");
    return res.status(500).json({
      data: {},
      message: "Not able to create the city",
      success: false,
      err: error,
    });
  }
};

const getAllCity = async (req, res) => {
  try {
    const response = await cityService.getAllCity(req.query);
    return res.status(200).json({
      data: response,
      message: "successFully fetched cities",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to fetch cities",
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
  getAllCity,
};