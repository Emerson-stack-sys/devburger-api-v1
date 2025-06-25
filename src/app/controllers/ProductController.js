import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";
import User from "../models/User";

class ProductController {
  async store(req, res) {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    const name = req.body.name?.trim();
    const price = Number(req.body.price);
    const category_id = Number(req.body.category_id);
    const offer = req.body.offer === "true";
    const { filename: path } = req.file;

    try {
      schema.validateSync(
        { name, price, category_id, offer },
        { abortEarly: false }
      );
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(req.userId);
    if (!user || !user.admin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return res.status(201).json({
      product: {
        name,
        price,
        category_id,
        path,
        url: `http://localhost:3001/files/${path}`,
      },
    });
  }

  async update(req, res) {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    const name = req.body.name?.trim();
    const price = Number(req.body.price);
    const category_id = Number(req.body.category_id);
    const offer = req.body.offer === "true";
    const { filename } = req.file;

    try {
      schema.validateSync(
        { name, price, category_id, offer },
        { abortEarly: false }
      );
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(req.userId);
    if (!user || !user.admin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const { id } = req.params;
    const findProduct = await Product.findByPk(id);
    if (!findProduct) {
      return res
        .status(404)
        .json({ error: "Make sure your product ID is correct" });
    }

    const path = filename || findProduct.path;

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({ message: "product updated successfully!" });
  }

  async index(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.json(products);
  }
}

export default new ProductController();
