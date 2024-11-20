-- CreateEnum
CREATE TYPE "RowStatus" AS ENUM ('ACTIVE', 'ACHIVED', 'DELETE');

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "status" "RowStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "status" "RowStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "status" "RowStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "status" "RowStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "Announcement_createdById_idx" ON "Announcement"("createdById");

-- CreateIndex
CREATE INDEX "Parent_createdById_idx" ON "Parent"("createdById");

-- CreateIndex
CREATE INDEX "Student_createdById_idx" ON "Student"("createdById");

-- CreateIndex
CREATE INDEX "Teacher_createdById_idx" ON "Teacher"("createdById");
