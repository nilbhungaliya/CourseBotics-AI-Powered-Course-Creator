/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `CourseList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "CourseChapters" (
    "id" SERIAL NOT NULL,
    "courseId" VARCHAR NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "videoId" VARCHAR NOT NULL,

    CONSTRAINT "CourseChapters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseChapters_courseId_chapterId_key" ON "CourseChapters"("courseId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseList_courseId_key" ON "CourseList"("courseId");

-- AddForeignKey
ALTER TABLE "CourseChapters" ADD CONSTRAINT "CourseChapters_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "CourseList"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
