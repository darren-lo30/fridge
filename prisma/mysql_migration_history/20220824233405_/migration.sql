/*
  Warnings:

  - The values [discrete_cnt] on the enum `IngredientType_measurementType` will be removed. If these variants are still used in the database, this will fail.
  - The values [discrete_cnt] on the enum `MeasurementUnit_measurementType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `IngredientType` MODIFY `measurementType` ENUM('discrete_no', 'volume_mL', 'weight_g') NOT NULL;

-- AlterTable
ALTER TABLE `MeasurementUnit` MODIFY `measurementType` ENUM('discrete_no', 'volume_mL', 'weight_g') NOT NULL;
