/*import * as Yup from "yup";

class ProductController {
  async store(req, res) {
    // Corrigindo nome, eliminando possíveis espaços extras
    const name = req.body.name?.trim() || req.body["name "]?.trim();

    // Usar o objeto com o nome corrigido para validação
    const data = {
      name,
      price: Number(req.body.price),
      category: req.body.category,
    };

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const schema = Yup.object({
      name: Yup.string().required("O campo nome é obrigatório"),
      price: Yup.number()
        .required("O campo preço é obrigatório")
        .typeError("Preço deve ser número"),
      category: Yup.string().required("O campo categoria é obrigatório"),
    });

    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    // Aqui você pode criar o produto no banco e retornar resposta

    return res.status(201).json({ message: "Produto criado com sucesso" });
  }
}

export default new ProductController();*/

import * as Yup from "yup";
import Product from "../models/Product";

class ProductController {
  async store(req, res) {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    // Verificação antes da destruturação
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    // Extrair e tratar dados
    const name = req.body.name?.trim();
    const price = Number(req.body.price);
    const category = req.body.category?.trim();
    const { filename: path } = req.file;

    try {
      schema.validateSync({ name, price, category }, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    // Criar o produto no banco de dados
    const product = await Product.create({
      name,
      price,
      category,
      path,
    });

    return res.status(201).json({
      product: {
        name,
        price,
        category,
        path,
        url: `http://localhost:3001/files/${path}`, // Opcional
      },
    });
  }
  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }
}
export default new ProductController();
