//bija user thi login hoy toy update karvaa dey ae application ma naa chale aetle middleware banavvu pade
import jwt from "jsonwebtoken";
export const authMiddleware_sp = async (req, res, next) => {
  // checking login status by token
  const token = req.cookies.token;
  const id = req.params.id;

  if (!token) {
    return res.status(400).json({ message: "Login first" });
  }

  try {
    // verify token if user login
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.serviceProviderId = decodedToken.serviceProviderId;

    // checking authorization of user
    if (id !== decodedToken.serviceProviderId) {
      return res.status(400).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
