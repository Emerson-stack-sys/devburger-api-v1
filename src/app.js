// aqui é o arquivo principal da aplicação
// src/app.js
// Importando as dependências necessárias
// src/app.js

// Importando o express para criar o servidor
import express from "express";
import routes from "./routes"; // 👈 Importar as rotas
import "./database"; // 👈 Garante conexão com o banco
import { resolve } from "node:path"; // 👈 Importar o resolve para resolver caminhos

class App {
  constructor() {
    this.app = express();

    this.middleware();
    this.routes(); // Chama a função de rotas
  }

  middleware() {
    this.app.use(express.json()); // Permite enviar JSON no corpo da requisição middleware
    this.app.use(
      "/product-file",
      express.static(resolve(__dirname, "..", "uploads"))
    ); // Permite acessar arquivos estáticos na pasta tmp
  }

  routes() {
    this.app.use(routes); //👈 Usar as rotas importadas
  }
}

export default new App().app;
