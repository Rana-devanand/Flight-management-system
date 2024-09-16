'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookingsTickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull : false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull : false,
      },
      status :{
        type: Sequelize.ENUM("Inprogress", "Pending", "Success", "Failed"),
        allowNull : false,
        defaultValue : "Inprogress",
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 1,
      },
      totalCost: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('BookingsTickets');
  }
};