'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class airplanes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  airplanes.init({
    Airline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 200,
    },
    Departure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Arrival: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DepartureTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    ArrivalTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    Remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flightLogo : {
      type : DataTypes.STRING,
      allowNull : false,
    },
  }, {
    sequelize,
    modelName: 'airplanes',
  });
  return airplanes;
};