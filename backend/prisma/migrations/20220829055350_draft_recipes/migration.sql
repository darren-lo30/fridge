-- AlterTable
ALTER TABLE `Ingredient` ALTER COLUMN `lastUpdated` DROP DEFAULT;

ALTER TABLE `Recipe` 
ADD CHECK (
  NOT published
  OR (
    published IS NOT NULL
    AND thumbnail IS NOT NULL
    AND title IS NOT NULL
    AND description IS NOT NULL
    AND instructions IS NOT NULL
  )
)

