import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    if (!decodedToken.uid) {
      res.sendStatus(403);
      return;
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error)
    res.status(403).send(error);
  }
}

export default authMiddleware;
