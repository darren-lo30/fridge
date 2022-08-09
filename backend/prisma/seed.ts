/* eslint-disable no-console */
import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword } from '../src/utils/passwordUtils';

const prisma = new PrismaClient();

async function main() {
  const userData: Prisma.UserCreateInput[] = [
    {
      fullName: 'test',
      email: 'test@gmail.com',
      password: await hashPassword('password'),
      fridge: {
        create: {},
      },
    },
  ];

  console.log('Start seeding ...');
  userData.forEach(async (u) => {
    await prisma.user.create({
      data: u,
    });
  });

  const ingredientData: Prisma.IngredientTypeCreateInput[] = [
    {
      name: 'chicken',
      measurementType: 'weight',
    },
    {
      name: 'beef',
      measurementType: 'weight',
    },
  ];

  ingredientData.forEach(async (i) => {
    await prisma.ingredientType.create({
      data: i,
    });
  });

  const measurementUnitData : Prisma.MeasurementUnitCreateInput[] = [
    {
      measurementType: 'discrete',
      unitName: 'number',
    },
    {
      measurementType: 'weight',
      unitName: 'kg',
    },
    {
      measurementType: 'weight',
      unitName: 'lb',
    },
    {
      measurementType: 'volume',
      unitName: 'L',
    },
    {
      measurementType: 'volume',
      unitName: 'oz',
    },
  ];

  measurementUnitData.forEach(async (i) => {
    await prisma.measurementUnit.create({
      data: i,
    });
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
