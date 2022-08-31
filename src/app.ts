import express from 'express';
import path from 'path';

// Import middleware
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ApplicationError, convertErrors, handleErrors } from '@src/middleware/errorHandler';

import router from '@routes/index';

// Initialize dotenv configuration for environment variables
import 'dotenv/config';

// Include passport and passport configs
import passport from 'passport';
import '@config/passport';

// Import prisma database and module for session store
import prisma from '@src/prisma';

// Import sessions and a store
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

// Import cors
import cors from 'cors';

import getEnvVar from '@src/utils/getEnvVar';
import corsConfig from './config/corsConfig';

const app = express();

app.use(cors(corsConfig));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.enable('trust proxy');

// Use passport middleware
app.use(session({
  secret: getEnvVar('NODE_ENV'),
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(
    // @ts-ignore -> typing bug with the the package
    prisma,
    {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
      sessionModelName: 'session',
    },
  ),
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    ...(process.env.NODE_ENV === 'production' ? {
      sameSite: 'none',
      secure: true,
    } : {}),
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.body) req.body = {};
  next();
});

app.use('/', router);

// Throws a 404 error if the request did not match an endpoint in the router
app.use((req, res, next) => next(new ApplicationError(404, 'API endpoint not found')));

app.use(convertErrors);

// Catches any errors that were thrown in the middleware and sends them back as the response
app.use(handleErrors);

export default app;
