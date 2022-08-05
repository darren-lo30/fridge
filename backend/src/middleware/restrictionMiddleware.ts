import express from 'express';
import { ApplicationError } from './errorHandler';

const withAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) {
    return next(new ApplicationError(401, 'User is unauthorized.'));
  }

  return next();
};

const withOwnership = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user || req.user.id !== req.params.userId) {
    return next(new ApplicationError(401, 'User does not have ownership of this resource.'));
  }

  return next();
};

// eslint-disable-next-line import/prefer-default-export
export { withAuth, withOwnership };
