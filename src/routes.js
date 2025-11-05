import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import CategoryController from "./app/controllers/CategoryController";
import OrderController from "./app/controllers/OrderController";

const routes = new Router();
const upload = multer(uploadConfig);

// Rotas públicas
routes.post("/users", UserController.store);  // rotas do cadastro de usuários
routes.post("/sessions", SessionController.store); // padronizado para plural

// Middleware de autenticação
routes.use(authMiddleware);  // todas as rotas abaixo dessa linha estarão protegidas pelo Express middleware ToKen

// Rotas protegidas por express middleware ToKen
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

export default routes;

