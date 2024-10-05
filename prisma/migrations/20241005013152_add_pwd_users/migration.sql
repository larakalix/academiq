/*
  Warnings:

  - Added the required column `password` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('PRINCIPAL', 'TEACHER', 'TEACHER_ASSISTANT');

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "TeacherRole" NOT NULL DEFAULT 'TEACHER';
