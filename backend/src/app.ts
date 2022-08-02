import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import router from '@routes/index';
import { ApplicationError, handleErrors } from 'middleware/errorHandler';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// Throws a 404 error if the request did not match an endpoint in the router
app.use((req, res, next) => {
  next(new ApplicationError(404, 'Endpoint not found'));
});

// Catches any errors that were thrown in the middleware and sends them back as the response
app.use((
  err: ApplicationError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  handleErrors(err, res);
});

export default app;
