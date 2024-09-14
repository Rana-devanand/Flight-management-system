'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT } = require("../config/serverConfig")

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.roles, {
        through: "users_roles",
      });
    }
  }
  user.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20],
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeCreate((user) => {
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    console.log(hashedPassword)
    user.password = hashedPassword;
  })
  return user;
};