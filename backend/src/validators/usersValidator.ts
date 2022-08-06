import { Schema } from 'express-validator';

const signInSchema: Schema = {
  email: {
    isEmail: true,
  },
  password: {
    isString: true,
  },
};

const signUpSchema: Schema = {
  fullName: {
    isString: true,
  },
  ...signInSchema,
};

export {
  signUpSchema,
  signInSchema,
};
