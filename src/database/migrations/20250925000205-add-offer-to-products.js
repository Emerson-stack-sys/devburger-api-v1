'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'offer' do tipo BOOLEAN
    await queryInterface.addColumn('products', 'offer', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // opcional, define que por padrão não está em oferta
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a coluna 'offer' se precisar desfazer a migration
    await queryInterface.removeColumn('products', 'offer');
  },
};

