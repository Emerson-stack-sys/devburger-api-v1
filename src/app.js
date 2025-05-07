/*import express from "express";
//import routes from "./routes";
import "./database"; // conecta com o banco e os models

class App {
  constructor() {
    this.app = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json()); // permite enviar JSON no corpo da requisição
  }

  routes() {
    //this.app.use(routes); // usa as rotas definidas em routes.js
  }
}

export default new App().app;*/

import express from "express";
// import routes from "./routes"; // Comentado para testar sem as rotas externas

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
    // Definindo a rota principal temporária
    this.app.get("/", (req, res) => {
      res.send("API ativa!");
    });
  }
}

export default new App().app;
