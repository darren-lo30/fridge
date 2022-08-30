/*
  Warnings:

  - You are about to drop the column `measurementUnits` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `displayUnits` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `measurementUnits`,
    ADD COLUMN `displayUnits` VARCHAR(191) NOT NULL;
