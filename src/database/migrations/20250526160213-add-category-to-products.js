'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'default-category', // para não quebrar em registros existentes
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('products', 'category');
  },
};

