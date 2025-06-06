import { v4 } from "uuid";

import * as Yup from "yup";

import User from "../models/User";

class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = req.body;

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });

    return res.status(201).json({
      id: user.id,
      name,
      email,
      admin,
    });
  }
  // NOVO MÉTODO GET /users
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"], // não retorna a senha
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }
}
export default new UserController();
// export default new UserController();
