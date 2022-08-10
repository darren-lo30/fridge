import { AnyZodObject, z, ZodError } from 'zod';
import express from 'express';

import { ApplicationError } from './errorHandler';

const validateRequest = (schema : AnyZodObject) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    schema.parse(req);
  } catch (err) {
    if (err instanceof ZodError) {
      throw ApplicationError.constructFromZodError(err);
    }
    throw err;
  }

  next();
};

const parseRequest = async <T extends AnyZodObject>(
  schema: T,
  req: express.Request,
): Promise<z.infer<T>> => {
  try {
    return schema.parse(req);
  } catch (err) {
    if (err instanceof ZodError) {
      throw ApplicationError.constructFromZodError(err);
    }
    throw err;
  }
};

export { parseRequest, validateRequest };
