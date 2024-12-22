'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedule_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flight_id: {
        type: Sequelize.INTEGER,
        allowNull :false,
      },
      Date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Departure: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      Arrival: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      totalTIme:{
        type : Sequelize.STRING,
        allowNull : false,
      },
      Total_seats: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      departureTime :{
        type : Sequelize.STRING,
        allowNull : false,
      },
      arrivalTime : {
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
    await queryInterface.dropTable('schedule-lists');
  }
};