-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('discrete_no', 'volume_mL', 'weight_g');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fridge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Fridge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "measurementType" "MeasurementType" NOT NULL,

    CONSTRAINT "IngredientType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "ingredientTypeId" TEXT NOT NULL,
    "fridgeId" TEXT,
    "recipeId" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "displayUnit" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "thumbnail" TEXT,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "instructions" JSONB,
    "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fridge_userId_key" ON "Fridge"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientType_name_key" ON "IngredientType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredientTypeId_fridgeId_key" ON "Ingredient"("ingredientTypeId", "fridgeId");

-- AddForeignKey
ALTER TABLE "Fridge" ADD CONSTRAINT "Fridge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_ingredientTypeId_fkey" FOREIGN KEY ("ingredientTypeId") REFERENCES "IngredientType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_fridgeId_fkey" FOREIGN KEY ("fridgeId") REFERENCES "Fridge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
