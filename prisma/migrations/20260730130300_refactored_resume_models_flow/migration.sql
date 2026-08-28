/*
  Warnings:

  - You are about to drop the column `resumeId` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `stillStudying` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `stillWorking` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `GeneratedResume` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `PersonalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Skills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[generatedResumeId]` on the table `PersonalInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generatedResumeId]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `generatedResumeId` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Made the column `endDate` on table `Education` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `generatedResumeId` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Made the column `endDate` on table `Experience` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `summary` to the `GeneratedResume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generatedResumeId` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generatedResumeId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generatedResumeId` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalInfo" DROP CONSTRAINT "PersonalInfo_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_resumeId_fkey";

-- DropIndex
DROP INDEX "PersonalInfo_resumeId_key";

-- DropIndex
DROP INDEX "Skills_resumeId_key";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "resumeId",
DROP COLUMN "stillStudying",
ADD COLUMN     "generatedResumeId" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "degree" DROP NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "description",
DROP COLUMN "resumeId",
DROP COLUMN "stillWorking",
ADD COLUMN     "generatedResumeId" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "responsibilities" TEXT[],
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "GeneratedResume" DROP COLUMN "content",
ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalInfo" DROP COLUMN "resumeId",
ADD COLUMN     "generatedResumeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "resumeId",
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "generatedResumeId" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "technologies" TEXT[];

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "resumeId",
ADD COLUMN     "generatedResumeId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Education_generatedResumeId_order_idx" ON "Education"("generatedResumeId", "order");

-- CreateIndex
CREATE INDEX "Experience_generatedResumeId_order_idx" ON "Experience"("generatedResumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_generatedResumeId_key" ON "PersonalInfo"("generatedResumeId");

-- CreateIndex
CREATE INDEX "Project_generatedResumeId_order_idx" ON "Project"("generatedResumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_generatedResumeId_key" ON "Skills"("generatedResumeId");

-- AddForeignKey
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_generatedResumeId_fkey" FOREIGN KEY ("generatedResumeId") REFERENCES "GeneratedResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_generatedResumeId_fkey" FOREIGN KEY ("generatedResumeId") REFERENCES "GeneratedResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_generatedResumeId_fkey" FOREIGN KEY ("generatedResumeId") REFERENCES "GeneratedResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_generatedResumeId_fkey" FOREIGN KEY ("generatedResumeId") REFERENCES "GeneratedResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_generatedResumeId_fkey" FOREIGN KEY ("generatedResumeId") REFERENCES "GeneratedResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
