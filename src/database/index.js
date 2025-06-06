// neste arquivo, vamos criar as rotas da nossa aplicação
// mapear as rotas para os controllers
// importar o sequelise para conectar ao banco de dados

import Sequelize from "sequelize";

import configDatabase from "../config/database";

import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models.map((model) => model.init(this.connection))
    .map( 
    (model) => model.associate && model.associate(this.connection.models),
  );
  }
}

export default new Database();
