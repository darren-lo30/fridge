import express from 'express';
import prisma from '@src/prisma';
import { getUserSchema, signInSchema, signUpSchema } from '@src/validators/usersValidator';
import { ApplicationError } from '@src/middleware/errorHandler';
import { hashPassword } from '@src/utils/passwordUtils';
import passport from 'passport';
import { User } from '@prisma/client';
import { parseRequest, validateRequest } from '@src/middleware/requestValidator';

// Sign up routine for user
const signUp = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { body: { fullName, email, password } } = await parseRequest(signUpSchema, req);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: removedPassword, ...returnUser } = user;

  return res.status(201).json({ user: returnUser });
};

// Sign in routine for user
const signIn = [
  validateRequest(signInSchema),
  async (

    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => passport.authenticate('local', async (err, user: User, info) => {
  // Uses passport local authentication which is based on sessions

    if (err) {
      return next(new ApplicationError(500, 'Something went wrong while signing in.'));
    }

    if (!user) {
      return next(new ApplicationError(401, 'Invalid credentials'));
    }

    // Login routine sets the session cookie for the user
    return req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(401).json(loginErr);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...returnUser } = user;

      // User has successfully signed in
      return res.status(200).json({ user: returnUser, message: 'User sign in was successful.' });
    });
  })(req, res, next),
];

// Gets a user based on the userId in the URL
const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { userId } } = await parseRequest(getUserSchema, req);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...returnUser } = user;

  return res.json({ user: returnUser });
};

const getAuthedUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) {
    throw new ApplicationError(401, 'User is not authenticated.');
  }

  return res.json({ user: req.user });
};

const signOut = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.logout({ keepSessionInfo: false }, (logoutErr) => next(new ApplicationError(500, 'Something went wrong while signing out.')));
  return res.sendStatus(200);
};

export {
  signUp,
  signIn,
  signOut,
  getUser,
  getAuthedUser,
};
