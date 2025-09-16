import * as Yup from "yup";
import Category from "../models/Category.js";
import User from "../models/User.js";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    try {
      await schema.validate(req.body, { abortEarly: false });

      const user = await User.findByPk(req.userId);
      if (!user || !user.admin) {
        return res.status(403).json({ error: "Access denied" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Arquivo é obrigatório." });
      }

      const { filename: path } = req.file;
      const { name } = req.body;

      const categoryExists = await Category.findOne({ where: { name } });
      if (categoryExists) {
        return res.status(400).json({ error: "Category already exists" });
      }

      const category = await Category.create({ name, path });

      return res.status(201).json({
        id: category.id,
        name: category.name,
        url: category.url, // virtual field que monta a URL da imagem
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal server error",
        details: err.errors || err.message,
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const user = await User.findByPk(req.userId);
      if (!user || !user.admin) {
        return res.status(403).json({ error: "Access denied" });
      }

      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const { name } = req.body;

      if (name && name !== category.name) {
        const categoryExists = await Category.findOne({ where: { name } });
        if (categoryExists) {
          return res.status(400).json({ error: "Category already exists" });
        }
      }

      if (req.file) {
        category.path = req.file.filename;
      }

      if (name) {
        category.name = name;
      }

      await category.save();

      return res.json({
        id: category.id,
        name: category.name,
        url: category.url,
      });
    } catch (err) {
      console.error(err);
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
