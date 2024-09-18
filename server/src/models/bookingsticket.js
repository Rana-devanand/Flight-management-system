'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingsTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingsTicket.init({
    flightId:{
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    userId: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    status :{
      type: DataTypes.ENUM("Inprogress", "Pending", "Success", "Failed"),
      allowNull : false,
      defaultValue : "Inprogress",
    },
    noOfSeats: {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue : 1,
    },
    totalCost: {
      type : DataTypes.INTEGER,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'BookingsTicket',
  });
  return BookingsTicket;
};