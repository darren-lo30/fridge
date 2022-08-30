/*
  Warnings:

  - You are about to drop the column `displayUnits` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `displayUnit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `displayUnits`,
    ADD COLUMN `displayUnit` VARCHAR(191) NOT NULL;
