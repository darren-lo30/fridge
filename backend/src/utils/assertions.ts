import express from 'express';
import { User } from '@prisma/client';

function assertExists<Type>(value: any) : asserts value is NonNullable<Type> {
  if (value === null || value === undefined) throw new Error('A parameter was not found.');
}

type AuthedRequest = express.Request & { user: User };
function assertIsAuthed(req: express.Request) : asserts req is AuthedRequest {
  return assertExists<User>(req.user);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  assertIsAuthed,
  assertExists,
};
