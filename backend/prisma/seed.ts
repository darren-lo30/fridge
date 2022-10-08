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
      name: 'Chicken',
      imageUrl: 'https://post.healthline.com/wp-content/uploads/2020/09/2375-Raw_Chicken-1296x728-header-1200x628.jpg',
      measurementType: 'weight_g',
    },
    {
      name: 'Beef',
      imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/v1595010964/stock/GettyImages-499422402_copy.jpg',
      measurementType: 'weight_g',
    },
    {
      name: 'Strawberry',
      imageUrl: 'http://clv.h-cdn.co/assets/15/22/2048x2048/square-1432664914-strawberry-facts1.jpg',
      measurementType: 'discrete_no',
    },
    {
      name: 'Milk',
      imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872?quality=90&resize=556,505',
      measurementType: 'volume_mL',
    },
    {
      name: 'Radish',
      imageUrl: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/07/radish-types-varieties-1296x728-header.jpg?w=1155&h=1528',
      measurementType: 'weight_g',
    },
    {
      name: 'Paprika',
      imageUrl: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/paprika-benefits-1296x728-feature.jpg?w=1155&h=1528',
      measurementType: 'volume_mL',
    },
    {
      name: 'Soy sauce',
      imageUrl: 'https://assets.epicurious.com/photos/561fc9ce53de6d0d5cdef3c8/master/pass/soy-sauce.jpg',
      measurementType: 'volume_mL',
    },
    {
      name: 'Apple',
      imageUrl: 'https://assets.epicurious.com/photos/561fc9ce53de6d0d5cdef3c8/master/pass/soy-sauce.jpg',
      measurementType: 'discrete_no',
    },
    {
      name: 'Cod',
      imageUrl: 'https://homecookworld.com/wp-content/uploads/2022/07/can-you-eat-raw-cod.jpg',
      measurementType: 'weight_g',
    },
    {
      name: 'Panko',
      imageUrl: 'https://pickledplum.com/wp-content/uploads/2021/01/panko-breadcrumbs-1-1200.jpg',
      measurementType: 'volume_mL',
    },
    {
      name: 'Egg',
      imageUrl: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg',
      measurementType: 'discrete_no',
    },
  ];

  for (let i = 1; i <= ingredientTypeData.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.ingredientType.create({ data: { id: String(i), ...ingredientTypeData[i - 1] } });
  }

  const ingredientData : Prisma.IngredientUncheckedCreateInput[] = [
    {
      amount: 4,
      ingredientTypeId: '1',
      displayUnit: 'kg',
    },
    {
      amount: 4,
      ingredientTypeId: '2',
      displayUnit: 'mg',
    },
    {
      amount: 4,
      ingredientTypeId: '3',
      displayUnit: 'no',
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
