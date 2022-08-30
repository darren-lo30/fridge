import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { Prisma, User } from '@prisma/client';
import { assertIsAuthed } from '@src/utils/assertions';
import {
  createRecipeSchema,
  deleteRecipeSchema,
  showRecipeSchema,
  indexRecipesSchema,
  indexUserRecipesSchema,
  updateRecipeSchema,
} from '@src/validators/recipesValidator';
import express from 'express';
import { convertToReturnIngredient } from '@src/utils/unitConversions';

const indexTailoredRecipes = async (indexArgs : Prisma.RecipeFindManyArgs, currentUser: User) => {
  // First finds the user's fridge to look for all the ingredients that they have
  const fridge = await prisma.fridge.findFirstOrThrow({
    where: {
      userId: currentUser.id,
    },
    include: {
      ingredients: true,
    },
  });

  const findManyAndConditions : Prisma.IngredientWhereInput[] = [];
  /*
  Then creates an array of conditions that will be chained together checking that every
  ingredient of the fridge has the following. The ingredient of the recipe must have an
  ingredientTypeId matching one of the ones seen in the user's fridge (OR chain)
  while also having an amount less than or equal to the amount of that same ingredient
  in the user's fridge. This ensures the user has enough of the ingredient to cook the recipe
  */
  fridge.ingredients.forEach((ingredient) => {
    findManyAndConditions.push({
      // Both the same ingredient and the one in the recipe is less than or equal
      // to the ingredient in the fridge
      AND: [{
        ingredientTypeId: {
          equals: ingredient.ingredientTypeId,
        },
        amount: {
          lte: ingredient.amount,
        },
      }],
    });
  });

  const recipes = await prisma.recipe.findMany({
    ...indexArgs,
    where: {
      published: true,
      ingredients: {
        // Runs the condition that every ingredient in the recipe exists in user's fridge and
        // requires amount less than user has
        every: {
          OR: findManyAndConditions,
        },
      },
    },
  });

  return recipes;
};

const indexUserRecipes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: { authorId },
    query: {
      cursor, limit, offset, published,
    },
  } = await parseRequest(indexUserRecipesSchema, req);

  const recipes = await prisma.recipe.findMany({
    where: {
      authorId,
      published,
    },
    take: limit,
    skip: offset,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      author: true,
    },
  });

  return res.json({ recipes });
};

const indexRecipes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  const {
    query: {
      cursor, limit, offset, show,
    },
  } = await parseRequest(indexRecipesSchema, req);

  const indexArgs : Prisma.RecipeFindManyArgs = {
    where: {
      published: true,
    },
    take: limit,
    skip: offset,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      ingredients: true,
      author: true,
    },
  };

  let recipes;
  if (show === 'all') {
    recipes = await prisma.recipe.findMany(indexArgs);
  } else if (show === 'tailored') {
    recipes = await indexTailoredRecipes(indexArgs, req.user!);
  }

  return res.json({ recipes });
};

const showRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { recipeId } } = await parseRequest(showRecipeSchema, req);

  const recipe = await prisma.recipe.findUniqueOrThrow({
    where: {
      id: recipeId,
    },
    include: {
      ingredients: {
        include: {
          ingredientType: true,
        },
      },
      author: true,
    },
  });

  recipe.ingredients = recipe.ingredients.map((ingredient) => (
    convertToReturnIngredient(ingredient)
  ));

  return res.json({ recipe });
};

const createRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);

  const {
    body: {
      instructions, title, description, thumbnail, published,
    },
  } = await parseRequest(createRecipeSchema, req);

  const instructionsJSON = instructions ? JSON.parse(instructions) : undefined;
  try {
    const recipe = await prisma.recipe.create({
      data: {
        authorId: req.user.id,
        description,
        thumbnail,
        instructions: instructionsJSON,
        title,
        published,
      },
    });

    return res.json({ recipe });
  } catch (e) {
    // Can not publish recipe
    const recipe = await prisma.recipe.create({
      data: {
        authorId: req.user.id,
        description,
        instructions: instructionsJSON,
        thumbnail,
        title,
        published: false,
      },
    });
    return res.status(202).json({ recipe, message: 'Recipe was created as a draft.' });
  }
};

const updateRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    body: {
      instructions, title, published, description,
    },
    params: { recipeId },
  } = await parseRequest(updateRecipeSchema, req);

  const instructionsJSON = instructions ? JSON.parse(instructions) : undefined;
  try {
    const recipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        description,
        title,
        instructions: instructionsJSON,
        published,
      },
    });

    return res.json({ recipe });
  } catch (e) {
    const recipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        description,
        title,
        instructions: instructionsJSON,
        published: false,
      },
    });

    return res.status(202).json({ recipe, message: 'Recipe was set as a draft due to missing content.' });
  }
};

const deleteRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { recipeId } } = await parseRequest(deleteRecipeSchema, req);
  await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  });

  return res.sendStatus(200);
};
export {
  indexRecipes,
  createRecipe,
  showRecipe,
  updateRecipe,
  indexUserRecipes,
  deleteRecipe,
};
