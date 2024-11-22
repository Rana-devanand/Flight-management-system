'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seat.belongsTo(models.airplanes ,{
        foreignKey : 'flight_id'
      })
      Seat.belongsTo(models.SeatTypes,{
        foreignKey :'seat_type_id'
      })
    }
  }
  Seat.init({
    Flight_Date : {
      type : DataTypes.DATE,
      allowNull : false,
    },
    flight_id:{
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    seat_type_id: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    seat_number:{
      type : DataTypes.STRING,
      allowNull : false,
    },
    is_Booked: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};