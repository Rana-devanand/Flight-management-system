'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('airplanes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Airline: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      modelNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Capacity: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 200
      },
      Departure: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Arrival: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DepartureTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ArrivalTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Remark :{
        type : Sequelize.STRING,
        allowNull : false,
      },
      flightLogo : {
        type : Sequelize.STRING,
        allowNull : false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('airplanes');
  }
};