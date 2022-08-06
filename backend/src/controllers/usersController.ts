import express from 'express';
import prisma from '@src/prisma';
import validateAndSantizeRequest from '@src/middleware/requestValidator';
import { signInSchema, signUpSchema } from '@src/validators/usersValidator';
import { ApplicationError } from '@src/middleware/errorHandler';
import { hashPassword } from '@src/utils/passwordUtils';
import passport from 'passport';

// Sign up routine for user
const signUp = [
  validateAndSantizeRequest(signUpSchema),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { fullName, email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          fullName,
          email,
          password: await hashPassword(password),
          fridge: {
            create: {},
          },
        },
      });

      return res.status(201).json({ user });
    } catch (error) {
      return next(new ApplicationError(500, 'Error occurred while creating user'));
    }
  }];

// Sign in routine for user
const signIn = [
  validateAndSantizeRequest(signInSchema),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => passport.authenticate('local', (err, user, info) => {
    // Uses passport local authentication which is based on sessions

    if (err) return next(new ApplicationError(500, 'Something went wrong while signing in.'));

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Login routine sets the session cookie for the user
    return req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(401).json(loginErr);
      }

      // User has successfully signed in
      return res.status(200).json({ user, message: 'User sign in was successful.' });
    });
  })(req, res, next),
];

// Gets a user based on the userId in the URL
const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.userId,
      },
    });

    return res.json({ user });
  } catch (e) {
    return next(new ApplicationError(404, 'User could not be found'));
  }
};

export {
  signUp,
  signIn,
  getUser,
};
