import express from 'express';
import prisma from '@src/prisma';
import validateAndSantizeRequest from 'middleware/requestValidator';
import { Schema } from 'express-validator';
import { ApplicationError } from 'middleware/errorHandler';

const createUserRequestSchema: Schema = {
  fullName: {
    isString: true,
  },
  email: {
    isEmail: true,
  },
};

const createUser = [
  validateAndSantizeRequest(createUserRequestSchema),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { fullName, email } = req.body;

    try {
      await prisma.user.create({
        data: {
          fullName,
          email,
        },
      });

      return res.status(201).end();
    } catch (error) {
      return next(new ApplicationError(500, 'Error occurred while creating user'));
    }
  }];

const getUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {

};

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

export {
  createUser,
  getUser,
  indexUsers,
};
