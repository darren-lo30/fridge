/*
  Warnings:

  - Added the required column `sid` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `sid` VARCHAR(191) NOT NULL;
