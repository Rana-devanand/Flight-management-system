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
    modelNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 200,
    }
  }, {
    sequelize,
    modelName: 'airplanes',
  });
  return airplanes;
};