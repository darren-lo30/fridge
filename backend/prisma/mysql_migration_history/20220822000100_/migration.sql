/*
  Warnings:

  - The values [discrete,volume,weight] on the enum `IngredientType_measurementType` will be removed. If these variants are still used in the database, this will fail.
  - The values [discrete,volume,weight] on the enum `MeasurementUnit_measurementType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IngredientType` MODIFY `measurementType` ENUM('discrete_cnt', 'volume_mL', 'weight_g') NOT NULL;

-- AlterTable
ALTER TABLE `MeasurementUnit` MODIFY `measurementType` ENUM('discrete_cnt', 'volume_mL', 'weight_g') NOT NULL;

-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `description` VARCHAR(191) NOT NULL;
