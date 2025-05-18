import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const isValid = await schema.isValid(res.body);
    if (!isValid) {
      return res
        .status(401)
        .json({ error: "Make sure your email or password are correct" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Make sure your email or password are correct" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Make sure your email or password are correct" });
    }

    return res.json({ message: "session" });
  }
}

export default new SessionController();
