/*
  Warnings:

  - Added the required column `imageUrl` to the `IngredientType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IngredientType` ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `IngredientType_name_idx` ON `IngredientType`(`name`);
