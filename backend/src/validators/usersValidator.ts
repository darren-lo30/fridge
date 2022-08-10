import { z } from 'zod';

const signInSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5),
  }),
});

const signUpSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5),
    fullName: z.string().min(1),
  }),
});

const getUserSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export {
  getUserSchema,
  signUpSchema,
  signInSchema,
};
