import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// defines the payload of the user
interface UserPayload {
  id: string,
  email: string;
}

// declares an extra attribute to Request Object
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // bellow if statement is equal to if (!req.session || !req.session.jwt) {}
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) { }

  next();
}