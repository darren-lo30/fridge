/*
  Warnings:

  - You are about to drop the column `measurementUnitId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the `MeasurementUnit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `measurementUnits` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ingredient` DROP FOREIGN KEY `Ingredient_measurementUnitId_fkey`;

-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `measurementUnitId`,
    ADD COLUMN `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `measurementUnits` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `MeasurementUnit`;
