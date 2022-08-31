import { AnyZodObject, z } from 'zod';
import express from 'express';

const validateRequest = (schema : AnyZodObject) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  schema.parse(req);
  next();
};

const parseRequest = async <T extends AnyZodObject>(
  schema: T,
  req: express.Request,
): Promise<z.infer<T>> => schema.parse(req);

export { parseRequest, validateRequest };
