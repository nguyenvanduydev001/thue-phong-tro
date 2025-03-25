CREATE TABLE `Bài đăng`(
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `star` VARCHAR(255) NOT NULL,
    `labelCode` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `acttribbutesId` VARCHAR(255) NOT NULL,
    `categoryCode` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `overviewId` VARCHAR(255) NOT NULL,
    `imagesId` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Hình ảnh`(
    `id` VARCHAR(255) NOT NULL,
    `images` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Người dùng`(
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Thuộc tính`(
    `id` VARCHAR(255) NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `acreage` VARCHAR(255) NOT NULL,
    `published` VARCHAR(255) NOT NULL,
    `hashtag` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Loại`(
    `id` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Nhãn`(
    `id` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Tổng quan`(
    `id` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `area` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `target` VARCHAR(255) NOT NULL,
    `created` DATE NOT NULL,
    `expire` DATE NOT NULL,
    `bonus` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `Bài đăng` ADD CONSTRAINT `bài đăng_acttribbutesid_foreign` FOREIGN KEY(`acttribbutesId`) REFERENCES `Thuộc tính`(`id`);
ALTER TABLE
    `Bài đăng` ADD CONSTRAINT `bài đăng_overviewid_foreign` FOREIGN KEY(`overviewId`) REFERENCES `Tổng quan`(`id`);
ALTER TABLE
    `Bài đăng` ADD CONSTRAINT `bài đăng_imagesid_foreign` FOREIGN KEY(`imagesId`) REFERENCES `Hình ảnh`(`id`);
ALTER TABLE
    `Bài đăng` ADD CONSTRAINT `bài đăng_categorycode_foreign` FOREIGN KEY(`categoryCode`) REFERENCES `Loại`(`id`);
ALTER TABLE
    `Bài đăng` ADD CONSTRAINT `bài đăng_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Người dùng`(`id`);
ALTER TABLE
    `Bài đăng` ADD CONSTRAINT `bài đăng_labelcode_foreign` FOREIGN KEY(`labelCode`) REFERENCES `Nhãn`(`code`);