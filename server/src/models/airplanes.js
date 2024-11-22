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
      this.hasMany(models.schedule_list, {
        foreignKey : "flight_id",
      });
      this.hasMany(models.Seat ,{
        foreignKey : "flight_id",
      })
    }
  }
  airplanes.init({
    flight_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Airline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flight_type :{
      type: DataTypes.STRING,
      allowNull: false,
    },
    // available_seats : {
    //   type : DataTypes.JSON,
    //   allowNull: false,
    // },
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
    // DepartureTime: {
    //   type: DataTypes.TIME,
    //   allowNull: false,
    // },
    // ArrivalTime: {
    //   type: DataTypes.TIME,
    //   allowNull: false,
    // },
    Remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // flight_status :{
    //   type : DataTypes.ENUM("Schedule", "Delayed", "Cancelled"),
    //   allowNull : false,
    //   defaultValue : "Schedule",
    // },
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