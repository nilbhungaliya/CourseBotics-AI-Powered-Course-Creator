-- CreateTable
CREATE TABLE "CourseList" (
    "id" SERIAL NOT NULL,
    "courseId" VARCHAR NOT NULL,
    "courseName" VARCHAR NOT NULL,
    "category" VARCHAR NOT NULL,
    "level" VARCHAR NOT NULL,
    "courseOutput" JSONB NOT NULL,
    "isVideo" VARCHAR NOT NULL DEFAULT 'Yes',
    "username" VARCHAR,
    "userprofileimage" VARCHAR,
    "createdBy" VARCHAR,
    "courseBanner" VARCHAR,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CourseList_pkey" PRIMARY KEY ("id")
);
