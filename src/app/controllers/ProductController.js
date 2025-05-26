import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";

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
    });

    // Conversão correta de dados
    const name = req.body.name?.trim();
    const price = Number(req.body.price);
    const category_id = Number(req.body.category_id); // Corrigido
    const { filename: path } = req.file;

    try {
      schema.validateSync({ name, price, category_id }, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
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

  async index(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"], // Corrigido aqui
        },
      ],
    });

    return res.json(products);
  }
}

export default new ProductController();

