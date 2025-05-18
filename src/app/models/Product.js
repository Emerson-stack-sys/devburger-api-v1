import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        category: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Product", // opcional, mas recomendado
      }
    );
  }
}

export default Product;
