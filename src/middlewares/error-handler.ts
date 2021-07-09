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

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    return res.status(400).send({
      errors: [{ message }]
    });
  }

  //Mongoose dublicate key
  if (err.code === 11000) {
    const message = "Dublicate field value entered.";
    return res.status(400).send({
      errors: [{ message }]
    });
  }

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