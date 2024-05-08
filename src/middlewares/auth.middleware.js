import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthenticated request." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Authentication error." })
  }
};
