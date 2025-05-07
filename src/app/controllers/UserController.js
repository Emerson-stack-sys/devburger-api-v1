import bcrypt from "bcryptjs";
import User from "../models/User";

class UserController {
  async store(req, res) {
    try {
      const { nome, email, senha, admin } = req.body;

      // Verificando se o usuário já existe
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Criptografando a senha com bcrypt
      const hashedPassword = await bcrypt.hash(senha, 8); // O número 8 é o saltRounds

      // Criando o novo usuário
      const user = await User.create({
        nome,
        email,
        senha: hashedPassword,
        admin,
      });

      return res.status(201).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        admin: user.admin,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno ao criar usuário" });
    }
  }
}

export default new UserController();
