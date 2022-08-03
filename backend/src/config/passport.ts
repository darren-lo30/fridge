import passport from 'passport';
import passportLocal from 'passport-local';
import prisma from '@src/prisma';
import { isValidPassword } from '@src/utils/passwordUtils';
import { Prisma } from '@prisma/client';

const LocalStrategy = passportLocal.Strategy;

const customFields : passportLocal.IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use(new LocalStrategy(
  customFields,
  async (email: string, password: string, cb) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) { return cb(null, false); }

      const isValid = await isValidPassword(password, user.password);
      if (isValid) {
        return cb(null, user);
      }
      return cb(null, false);
    } catch (err) {
      return cb(err);
    }
  },
));

passport.serializeUser(async (user: Prisma.UserSelect, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId: string, cb) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
});
