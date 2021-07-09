import { Request, Response, NextFunction } from "express";
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors()
    });
  }

  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((error: any) => {
      return { message: error.message };
    });
    return res.status(400).send({
      errors: message
    });
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
}