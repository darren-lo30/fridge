import express from 'express';

class ApplicationError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleErrors = (err: ApplicationError, res: express.Response) => {
  const { statusCode, message } = err;
  return res.status(statusCode).json({
    message,
  });
};

export {
  ApplicationError,
  handleErrors,
};
