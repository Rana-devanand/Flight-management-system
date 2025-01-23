'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flight_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  flight_schedule.init({
    // schedule_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull :false,
    // },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'flights',
        key: 'flight_id',
      },
      onDelete: 'CASCADE'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    recurrence_pattern: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departure_time:{
      type :  DataTypes.DATE,
      allowNull : false,
    },
    arrival_time: {
      type : DataTypes.DATE,
      allowNull : false,
    },
    // available_seats: {
    //   type : DataTypes.JSON,
    //   allowNull : false,
    // },
    flight_status: {
      type : DataTypes.ENUM('Schedule', 'Available', 'UnAvailable'),
      allowNull : false,
      defaultValue : 'Schedule',
    }
  }, {
    sequelize,
    modelName: 'flight_schedule',
  });
  return flight_schedule;
};