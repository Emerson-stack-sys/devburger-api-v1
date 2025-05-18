// aqui é o arquivo principal da aplicação
// src/app.js
// Importando as dependências necessárias
// src/app.js

// Importando o express para criar o servidor
import express from "express";
import routes from "./routes"; // 👈 Importar as rotas
import "./database"; // 👈 Garante conexão com o banco

class App {
  constructor() {
    this.app = express();

    this.middleware();
    this.routes(); // Chama a função de rotas
  }

  middleware() {
    this.app.use(express.json()); // Permite enviar JSON no corpo da requisição
  }

  routes() {
    this.app.use(routes); //👈 Usar as rotas importadas
  }
}

export default new App().app;
