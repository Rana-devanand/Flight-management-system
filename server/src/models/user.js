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
        len: [6, 100],
        // is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/, 
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


user.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT);
  user.password = hashedPassword;
})
user.beforeUpdate(async (user) => {
  if(user.changed("password")) {
    const hashedPassword = await bcrypt.hash(user.password, SALT);
    console.log("Hook password :" , hashedPassword);
    user.password = hashedPassword;
  }
})
  
  return user;
};