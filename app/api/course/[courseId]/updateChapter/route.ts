import { NextRequest, NextResponse } from 'next/server';
import db from "@/db";
import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';

export const runtime = 'nodejs'


export const PUT = async (req: NextRequest, args: any) => {
  const body = await req.json();
  console.log(body);
  const { id, chapterIndex, chapterName, about } = body; // Extract relevant data

  console.log(body);

  // Validate the input
  if (!id || chapterIndex === undefined || !chapterName || !about) {
    return NextResponse.json({ error: "Invalid data provided" });
  }

  try {
    // Fetch the current course by ID
    const currentCourse = await db.courseList.findUnique({
      where: { id },
    });

    if (!currentCourse) {
      return NextResponse.json({ error: "Course not found" });
    }

    const currentCourseOutput = currentCourse.courseOutput as Record<string, any>;
    const updatedChapters = [...currentCourseOutput.chapters];

    console.log(updatedChapters);

    // Update the specific chapter by index
    if (updatedChapters[chapterIndex]) {
      updatedChapters[chapterIndex] = {
        ...updatedChapters[chapterIndex], // Keep existing chapter data intact
        chapterName,  // Update the chapter name
        about,  // Update the about
      };
    } else {
      return NextResponse.json({ error: "Chapter not found" });
    }

    // Create the updated course output
    const updatedCourseOutput = {
      ...currentCourseOutput,
      chapters: updatedChapters,
    };

    // Update the course in the database with the updated chapters
    const updatedCourse = await db.courseList.update({
      where: { id },
      data: { courseOutput: updatedCourseOutput },
    });

    // Return the updated course
    return NextResponse.json({ updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course info" });
  }
};
