import * as Yup from "yup";
import Category from "../models/Category.js";
import User from "../models/User.js";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      // Valida o corpo da requisição
      await schema.validate(req.body, { abortEarly: false });

      // Busca o usuário e verifica se é admin
      const user = await User.findByPk(req.userId);
      if (!user || !user.admin) {
        return res.status(403).json({ error: "Access denied" });
      }

      const { name } = req.body;

      // Verifica se a categoria já existe
      const categoryExists = await Category.findOne({ where: { name } });
      if (categoryExists) {
        return res.status(400).json({ error: "Category already exists" });
      }

      // Cria nova categoria
      const category = await Category.create({ name });

      return res.status(201).json({ id: category.id, name: category.name });
    } catch (err) {
      // Lida com erro de validação ou erro interno
      console.error(err); // Para debug
      return res.status(500).json({
        error: "Internal server error",
        details: err.errors || err.message,
      });
    }
  }

  async index(req, res) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({
        error: "Failed to load categories",
        details: err.message,
      });
    }
  }
}

export default new CategoryController();
