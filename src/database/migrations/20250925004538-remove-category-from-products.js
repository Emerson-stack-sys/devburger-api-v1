
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.removeColumn('products', 'category');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'category', {
    type: Sequelize.STRING,
    allowNull: false,
  });
}
