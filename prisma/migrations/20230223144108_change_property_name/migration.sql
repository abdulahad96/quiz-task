/*
  Warnings:

  - You are about to drop the column `text` on the `question` table. All the data in the column will be lost.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `question` DROP COLUMN `text`,
    ADD COLUMN `question` VARCHAR(191) NOT NULL;
