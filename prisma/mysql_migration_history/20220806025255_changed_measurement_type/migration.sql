/*
  Warnings:

  - You are about to drop the column `measurementType` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `measurementType` to the `IngredientType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `measurementType`;

-- AlterTable
ALTER TABLE `IngredientType` ADD COLUMN `measurementType` ENUM('discrete', 'volume') NOT NULL;
