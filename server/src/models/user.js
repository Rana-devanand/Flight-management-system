'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20],
      },
    },
    number: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};