import { User } from '@prisma/client';

type AuthedRequest = Express.Request & { user: User };
function assertIsAuthed(req: Express.Request) : asserts req is AuthedRequest {
  if (req.user === undefined) {
    throw new Error('User was expected in request.');
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  assertIsAuthed,
};
