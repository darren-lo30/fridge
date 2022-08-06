/*
  Warnings:

  - You are about to drop the column `int` on the `Ingredient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ingredientTypeId,fridgeId]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `measurementType` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `int`,
    ADD COLUMN `measurementType` ENUM('discrete', 'volume', 'weight') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ingredient_ingredientTypeId_fridgeId_key` ON `Ingredient`(`ingredientTypeId`, `fridgeId`);
