import express from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ApplicationError } from './errorHandler';

const validateAndSantizeRequest = (schema: Schema) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  await checkSchema(schema).run(req);
  const validationErrors = validationResult(req);

  if (validationErrors.array().length > 0) {
    const invalidParams : string = Array.from(new Set(validationErrors.array().map((e) => e.param))).join(', ');
    return next(new ApplicationError(400, `Invalid parameters for fields: ${invalidParams}`));
  }

  return next();
};

export default validateAndSantizeRequest;
