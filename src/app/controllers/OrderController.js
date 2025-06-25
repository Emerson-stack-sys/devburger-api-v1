import * as Yup from "yup";
import Order from "../models/schemas/Order"; // MongoDB
import Product from "../models/Product"; // Sequelize
import Category from "../models/Category"; // Sequelize
import User from "../models/User"; // Sequelize

class OrderController {
  async store(req, res) {
    const schema = Yup.object({
      products: Yup.array()
        .required("Lista de produtos é obrigatória")
        .of(
          Yup.object({
            id: Yup.number().required("product_id é obrigatório"),
            quantify: Yup.number().required("quantify é obrigatório"),
          })
        ),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(req.userId);
    if (!user || !user.admin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const { products } = req.body;

    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const formattedProducts = findProducts.map((product) => {
      const foundProduct = products.find((p) => p.id === product.id);

      return {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: product.url,
        quantify: foundProduct.quantify,
        total: product.price * foundProduct.quantify,
      };
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formattedProducts,
      status: "Pedido realizado",
    };

    const createdOrder = await Order.create(order);

    return res.status(201).json(createdOrder);
  }

  async index(req, res) {
    const orders = await Order.find();
    return res.json(orders);
  }
  async update(req, res) {
    const schema = Yup.object({
      status: Yup.string().required("Lista de produtos é obrigatória"),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
    const { id } = req.body;
    const { status } = req.body;
    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao atualizar o status do pedido" });
    }
    return res.json({ message: "status update successfully" });
  }
}

export default new OrderController();
