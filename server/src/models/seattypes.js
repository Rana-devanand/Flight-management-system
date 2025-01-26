'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeatTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Seat , {
        foreignKey: 'seat_type_id',
      })
    }
  }
  SeatTypes.init({
   
    seat_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    flight_id : {
      type : DataTypes.INTEGER,
      allowNull: false,
    },
    seat_type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price :{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    seats_per_row:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'SeatTypes',
  });
  return SeatTypes;
};