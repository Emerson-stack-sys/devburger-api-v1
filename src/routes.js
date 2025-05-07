import { Router } from "express";
import UserController from "./app/controllers/UserController.js";

const routes = new Router();

routes.get("/users", (req, res) => {
  res.send("Servidor está online!");
});

routes.post("/users", UserController.store);

export default routes;
