import bcrypt from "bcryptjs";
import User from "../models/User";

class UserController {
  async store(req, res) {
    try {
      // Desestruturação correta com os mesmos nomes usados no Model
      const { name, email, password, admin } = req.body;

      // Verificando se o usuário já existe no banco
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Criptografando a senha antes de salvar
      const hashedPassword = await bcrypt.hash(password, 8); // 8 salt rounds

      // Criando o novo usuário com os campos corretos conforme definidos no Model
      const user = await User.create({
        name, // corresponde ao campo 'name' no model
        email, // corresponde ao campo 'email' no model
        password_hash: hashedPassword, // corresponde ao campo 'password_hash'
        admin, // corresponde ao campo 'admin' no model
      });

      // Retornando apenas os dados seguros
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (error) {
      console.error(error); // log no backend para debugging
      return res.status(500).json({ error: "Erro interno ao criar usuário" });
    }
  }
}

export default new UserController();
