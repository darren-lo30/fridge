-- AlterTable
ALTER TABLE `IngredientType` MODIFY `measurementType` ENUM('discrete', 'volume', 'weight') NOT NULL;
