import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const authToken = authHeader.split(" ").at(1);

  jwt.verify(authToken, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token is invalid" });
    }

    req.userId = decoded.id;
    return next();
  });
}

export default authMiddleware;
