'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeatTypes', {
      seat_type_id: {

        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flight_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seat_type_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price :{
        type : Sequelize.FLOAT,
        allowNull : false,
      },
      seats_per_row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_seats: {
        type: Sequelize.INTEGER,
        allowNull:false,
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
    await queryInterface.dropTable('SeatTypes');
  }
};