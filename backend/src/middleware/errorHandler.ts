import { Prisma } from '@prisma/client';
import express from 'express';

class ApplicationError extends Error {
  statusCode : number;

  message: string;

  data : any;

  constructor(statusCode : number, message: string, data?: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static constructFromDbError(dbError: any) : ApplicationError {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(dbError);
    }

    if (dbError instanceof Prisma.PrismaClientValidationError) {
      return new ApplicationError(
        400,
        dbError.message,
      );
    }

    if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
      if (dbError.code === 'P2003') {
        return new ApplicationError(
          500,
          'A provided reference ID is invalid',
          dbError.meta,
        );
      }

      if (dbError.code === 'P2025') {
        return new ApplicationError(
          404,
          'Resource not found',
          dbError.meta,
        );
      }
    }

    return new ApplicationError(
      500,
      'Unexpected error occurred.',
    );
  }
}

const handleErrors = (
  err: ApplicationError,
  res: express.Response,
) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  return res.status(err.statusCode).json({ ...err });
};
export {
  ApplicationError,
  handleErrors,
};
