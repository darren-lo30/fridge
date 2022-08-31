/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `IngredientType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `measurementUnitId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` ADD COLUMN `measurementUnitId` VARCHAR(191) NOT NULL,
    ALTER COLUMN `amount` DROP DEFAULT;

-- CreateTable
CREATE TABLE `MeasurementUnit` (
    `id` VARCHAR(191) NOT NULL,
    `measurementType` ENUM('discrete', 'volume', 'weight') NOT NULL,
    `unitName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MeasurementUnit_unitName_key`(`unitName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `IngredientType_name_key` ON `IngredientType`(`name`);

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_measurementUnitId_fkey` FOREIGN KEY (`measurementUnitId`) REFERENCES `MeasurementUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
