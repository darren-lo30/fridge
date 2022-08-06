import { User as PrismaUser } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  declare namespace Express {
    export interface User extends PrismaUser {}
  }
}
