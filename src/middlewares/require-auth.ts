import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

/**
 * Middleware to check if the user is authenticated.
 * If roles are provided, then checks if the user role is included.
 * 
 * @param roles 
 */
const requireAuth = (...roles: string[]) => {
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

export { requireAuth };