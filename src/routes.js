import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";

const routes = new Router();

const upload = multer(uploadConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.post("/products", upload.single("file"), ProductController.store);

export default routes;
