-- DropForeignKey
ALTER TABLE `Ingredient` DROP FOREIGN KEY `Ingredient_fridgeId_fkey`;

-- AlterTable
ALTER TABLE `Ingredient` ADD COLUMN `recipeId` VARCHAR(191) NULL,
    MODIFY `fridgeId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NOT NULL,
    `postedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_fridgeId_fkey` FOREIGN KEY (`fridgeId`) REFERENCES `Fridge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
