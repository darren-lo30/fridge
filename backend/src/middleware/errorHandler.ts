import { Prisma } from '@prisma/client';
import express from 'express';
import { ZodError } from 'zod';

class ApplicationError extends Error {
  statusCode : number;

  message: string;

  data : any;

  constructor(statusCode : number, message: string, data?: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }

  static constructFromDbError(dbError: any) : ApplicationError {
    if (process.env.LOG_ERRORS === 'true') {
      // eslint-disable-next-line no-console
      console.log(dbError);
    }

    if (dbError instanceof Prisma.PrismaClientValidationError) {
      return new ApplicationError(
        400,
        dbError.message,
      );
    }

    // Occurs when user attempts to find a resource that does not exist
    // This should never occur for resources the user must have ownership of to view
    if (dbError instanceof Prisma.NotFoundError) {
      return new ApplicationError(
        404,
        dbError.message,
      );
    }

    if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
      // Occurs when a foreign key provided by the user is invalid
      if (dbError.code === 'P2003') {
        return new ApplicationError(
          400,
          'A provided reference ID is invalid.',
          dbError.meta,
        );
      }

      // Occurs when a user attempts to update or delete a resource that does not exist
      // This should never occur for resources the user must have ownership of to update or delete
      if (dbError.code === 'P2025') {
        return new ApplicationError(
          404,
          'Resource not found.',
          dbError.meta,
        );
      }

      // Occurs when the user tries to create a resource with
      // unique parameters that already exist in the database
      if (dbError.code === 'P2002') {
        return new ApplicationError(
          409,
          'Resource already exists.',
          dbError.meta,
        );
      }
    }

    return new ApplicationError(
      500,
      'An unexpected error occurred.',
    );
  }

  static constructFromZodError(validationError: ZodError) : ApplicationError {
    if (process.env.LOG_ERRORS === 'true') {
      // eslint-disable-next-line no-console
      console.log(validationError);
    }

    return new ApplicationError(
      400,
      'Parameters sent were invalid for the request',
      validationError,
    );
  }
}

const convertErrors = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err instanceof ZodError) {
    return next(ApplicationError.constructFromZodError(err));
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError
     || err instanceof Prisma.PrismaClientKnownRequestError
     || err instanceof Prisma.PrismaClientRustPanicError
     || err instanceof Prisma.PrismaClientInitializationError
     || err instanceof Prisma.PrismaClientValidationError
     || err instanceof Prisma.NotFoundError) {
    return next(ApplicationError.constructFromDbError(err));
  }

  return next(err);
};

const handleErrors = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (process.env.LOG_ERRORS === 'true') {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({ ...err });
  }

  return res.status(500).json({ message: 'An unexpected error occured.' });
};
export {
  ApplicationError,
  convertErrors,
  handleErrors,
};
