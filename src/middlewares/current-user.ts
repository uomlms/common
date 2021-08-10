import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken, UserPayload } from '../utils/verify-token';

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

  req.currentUser = verifyToken(req.session.jwt);
  next();
}