/*
  Warnings:

  - Made the column `title` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Recipe` MODIFY `title` VARCHAR(191) NOT NULL DEFAULT 'Untitled';
