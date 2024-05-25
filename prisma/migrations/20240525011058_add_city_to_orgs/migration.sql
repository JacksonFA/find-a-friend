/*
  Warnings:

  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
