-- CreateTable
CREATE TABLE `Session` (
    `sid` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `data` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
