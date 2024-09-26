'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  schedule_list.init({
    flight_id: {
      type :DataTypes.INTEGER,
      allowNull : false,
    },
    Date: {
      type : DataTypes.DATE,
      allowNull : false,
    },
    Departure: {
      type : DataTypes.TIME,
      allowNull : false,
    },
    Arrival: {
      type : DataTypes.TIME,
      allowNull : false,
    },
    Total_seats: {
      type : DataTypes.JSON,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'schedule_list',
  });
  return schedule_list;
};