'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flight_schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // schedule_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull : false,
      // },
      flight_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references: {
          model: 'airplanes',
          key: 'flight_id'
        },
        onDelete: 'CASCADE'
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull : false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull : false,
      },
      recurrence_pattern: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      departure_time: {
        type: Sequelize.TIME,
        allowNull : false,
      },
      arrival_time: {
        type: Sequelize.TIME,
        allowNull : false,
      },
      // available_seats: {
      //   type: Sequelize.JSON,
      //   allowNull : false,
      // },
      flight_status: {
        type: Sequelize.ENUM('Schedule', 'Available', 'UnAvailable'),
        defaultValue: 'Schedule',
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
    await queryInterface.dropTable('flight_schedules');
  }
};