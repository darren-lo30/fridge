/* eslint-disable no-console */
import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword } from '../src/utils/passwordUtils';

const prisma = new PrismaClient();

async function main() {
  const userId = '123';
  const userData: Prisma.UserCreateInput = {
    id: userId,
    fullName: 'test',
    email: 'test@gmail.com',
    password: await hashPassword('password'),
    fridge: {
      create: {
        id: '5',
      },
    },
  };

  console.log('Start seeding ...');
  await prisma.user.create({ data: userData });

  const ingredientTypeData: Prisma.IngredientTypeCreateInput[] = [
    {
      name: 'chicken',
      imageUrl: '',
      measurementType: 'weight_g',
    },
    {
      name: 'beef',
      imageUrl: '',
      measurementType: 'weight_g',
    },
    {
      name: 'strawberry',
      imageUrl: '',
      measurementType: 'discrete_cnt',
    },
    {
      name: 'milk',
      imageUrl: '',
      measurementType: 'volume_mL',
    },
    {
      name: 'radish',
      imageUrl: '',
      measurementType: 'weight_g',
    },
    {
      name: 'paprika',
      imageUrl: '',
      measurementType: 'volume_mL',
    },
    {
      name: 'soy sauce',
      imageUrl: '',
      measurementType: 'volume_mL',
    },
    {
      name: 'apple',
      imageUrl: '',
      measurementType: 'discrete_cnt',
    },
    {
      name: 'fish',
      imageUrl: '',
      measurementType: 'weight_g',
    },
    {
      name: 'panko',
      imageUrl: '',
      measurementType: 'volume_mL',
    },
    {
      name: 'egg',
      imageUrl: '',
      measurementType: 'discrete_cnt',
    },
  ];

  for (let i = 0; i < ingredientTypeData.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.ingredientType.create({ data: { id: String(i), ...ingredientTypeData[i] } });
  }

  const measurementUnitData : Prisma.MeasurementUnitCreateInput[] = [
    {

      measurementType: 'discrete_cnt',
      unitName: 'number',
    },
    {
      measurementType: 'weight_g',
      unitName: 'kg',
    },
    {
      measurementType: 'weight_g',
      unitName: 'lb',
    },
    {
      measurementType: 'volume_mL',
      unitName: 'L',
    },
    {
      measurementType: 'volume_mL',
      unitName: 'oz',
    },
  ];

  measurementUnitData.forEach(async (i, index) => {
    await prisma.measurementUnit.create({
      data: { id: String(index), ...i },
    });
  });

  const ingredientData : Prisma.IngredientUncheckedCreateInput[] = [
    {
      amount: 4,
      ingredientTypeId: '1',
      measurementUnitId: '1',
    },
    {
      amount: 4,
      ingredientTypeId: '4',
      measurementUnitId: '1',
    },
    {
      amount: 4,
      ingredientTypeId: '3',
      measurementUnitId: '1',
    },
    {
      amount: 4,
      ingredientTypeId: '2',
      measurementUnitId: '1',
    },
    {
      amount: 4,
      ingredientTypeId: '5',
      measurementUnitId: '1',
    },
    {
      amount: 4,
      ingredientTypeId: '6',
      measurementUnitId: '1',
    },
    {
      amount: 4,
      ingredientTypeId: '7',
      measurementUnitId: '1',
    },
    {
      amount: 4,
      ingredientTypeId: '8',
      measurementUnitId: '1',
    },
  ];

  ingredientData.forEach(async (i) => {
    await prisma.ingredient.create({
      data: { ...i, fridgeId: '5' },
    });
  });

  console.log('Seeding finished.');

  const recipes : Prisma.RecipeUncheckedCreateInput[] = [
    {
      authorId: userId,
      thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
      description: 'This is a recipe',
      instructions: 'These are the instructions',
      title: 'Title 123',
    },
    {
      authorId: userId,
      thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
      description: 'This is a recipe',
      instructions: 'These are the instructions',
      title: 'Title 123',
    },
    {
      authorId: userId,
      thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
      description: 'This is a recipe',
      instructions: 'These are the instructions',
      title: 'Title 123',
    },
    {
      authorId: userId,
      thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
      description: 'This is a recipe',
      instructions: 'These are the instructions',
      title: 'Title 123',
    },
    {
      authorId: userId,
      thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
      description: 'This is a recipe',
      instructions: 'These are the instructions',
      title: 'Title 123',
    },
    {
      authorId: userId,
      thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
      description: 'This is a recipe',
      instructions: 'These are the instructions',
      title: 'Title 123',
    },
    {
      authorId: userId,
      thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
      description: 'This is a recipe',
      instructions: 'These are the instructions',
      title: 'Title 123',
    },
  ];

  recipes.forEach(async (i) => {
    await prisma.recipe.create({
      data: i,
    });
  });
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
