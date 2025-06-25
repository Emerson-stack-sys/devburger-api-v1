import Sequelize from "sequelize";
import mongoose from "mongoose";

import configDatabase from "../config/database";

import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);

    models
      .map((model) => model.init(this.connection))
      .map((model) =>
        model.associate ? model.associate(this.connection.models) : null
      );
  }

  async mongo() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/devburger", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(" MongoDB conectado com sucesso!");
    } catch (error) {
      console.error(" Erro ao conectar no MongoDB:", error);
    }
  }
}

export default new Database();
