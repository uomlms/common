import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 403;

  constructor(message: string) {
    // ths is only for logging purposes
    super(message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}