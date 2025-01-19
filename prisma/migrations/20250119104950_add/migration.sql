-- DropForeignKey
ALTER TABLE "CourseChapters" DROP CONSTRAINT "CourseChapters_courseId_fkey";

-- AddForeignKey
ALTER TABLE "CourseChapters" ADD CONSTRAINT "CourseChapters_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "CourseList"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;
