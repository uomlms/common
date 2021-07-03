import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }

    if (roles.length && !roles.includes(req.currentUser.role)) {
      throw new NotAuthorizedError();
    }

    next();
  }

}
