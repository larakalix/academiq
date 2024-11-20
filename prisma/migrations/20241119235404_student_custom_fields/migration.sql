/*
  Warnings:

  - You are about to drop the column `customFields` on the `CustomFields` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomFields" DROP COLUMN "customFields";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "customFields" JSONB;
