'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flight_Date:{
        type: Sequelize.DATE,
        allowNull : false,
      },
      flight_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'airplanes',
          key: 'flight_id'
        },
        onUpdate :'CASCADE',
        onDelete: 'CASCADE'
      },
      seat_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SeatTypes',
          key: 'seat_type_id'
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE',
      },
      seat_number: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      is_Booked: {
        type: Sequelize.BOOLEAN,
        allowNull : false
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
    await queryInterface.dropTable('Seats');
  }
};