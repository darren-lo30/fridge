import express from 'express';
import prisma from '@src/prisma';
import validateAndSantizeRequest from '@src/middleware/requestValidator';
import { Schema } from 'express-validator';
import { ApplicationError } from '@src/middleware/errorHandler';
import { hashPassword } from '@src/utils/passwordUtils';
import passport from 'passport';

const signInRequestSchema: Schema = {
  email: {
    isEmail: true,
  },
  password: {
    isString: true,
  },
};

const signUpRequestSchema: Schema = {
  fullName: {
    isString: true,
  },
  ...signInRequestSchema,
};

const signUp = [
  validateAndSantizeRequest(signUpRequestSchema),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { fullName, email, password } = req.body;
    try {
      await prisma.user.create({
        data: {
          fullName,
          email,
          password: await hashPassword(password),
        },
      });

      return res.sendStatus(201);
    } catch (error) {
      return next(new ApplicationError(500, 'Error occurred while creating user'));
    }
  }];

const signIn = [
  validateAndSantizeRequest(signInRequestSchema),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => passport.authenticate('local', (err, user, info) => {
    if (err) return next(new ApplicationError(500, 'Something went wrong while signing in.'));

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(401).json(loginErr);
      }

      // User has successfully signed in
      return res.status(200).json({ message: 'User sign in was successful.' });
    });
  })(req, res, next),
];

const indexUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const users = await prisma.user.findMany();

    return res.json({ users });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to query users',
    });
  }
};

const getUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {

};

export {
  signUp,
  signIn,
  indexUsers,
  getUser,
};
