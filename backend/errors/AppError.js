export class AppError extends Error {
  constructor(message, statusCode, formError = null) {
    super(message);
    this.statusCode = statusCode;
    this.formError = formError;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}