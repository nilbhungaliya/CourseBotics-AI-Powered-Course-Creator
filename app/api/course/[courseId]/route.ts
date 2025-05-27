import { NextRequest, NextResponse } from 'next/server';
import db from "@/db";
import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';

export const runtime = 'nodejs'

export const POST = async (req: NextRequest, args: any) => {
  try {
    const courseId = args.params.courseId;
    // console.log("Received courseId:", courseId);
    // Parse the incoming request body
    const body = await req.json();
    // console.log("Request body:", body);
    const { user } = body;
    console.log(user?.primaryEmailAddress?.emailAddress);
    

    if (!user) {
        return NextResponse.json({ error: "Missing required parameter: email" }, { status: 400 });
    }
    
    // Fetch the course from the database based on courseId and user email
    const course = await db.courseList.findFirst({
      where: {
        courseId: courseId, // Assuming 'courseId' is the unique identifier for your courses
        createdBy: user?.user?.primaryEmailAddress?.emailAddress,
      },
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Return the course data as JSON
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async(req:NextRequest, args:any)=>{
  const body = await req.json();
  const { id, courseOutput } = body;
  // console.log(body);

  // Validate the input
  if (!id || !courseOutput || !courseOutput.topic || !courseOutput.description) {
    return NextResponse.json({ error: 'Invalid data provided' });
  }

  try {
    const currentCourse = await db.courseList.findUnique({
      where: { id },
    });

    if (!currentCourse) {
      return NextResponse.json({ error: 'Course not found' });
    }

    const existingCourseOutput = currentCourse.courseOutput as Record<string, any>;
    const newCourseOutput = courseOutput as Record<string, any>;

    // Merge the current data with the new data
    const updatedCourseOutput = {
      ...existingCourseOutput,
      ...newCourseOutput,
    };

    const validUpdatedCourseOutput: InputJsonValue = updatedCourseOutput as InputJsonValue;

    const updatedCourse = await db.courseList.update({
      where: { id },
      data: { courseOutput: validUpdatedCourseOutput },
    });

    // Return the updated course
    return NextResponse.json({ updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Failed to update course info' });
  }
}



export const PATCH = async (req: NextRequest, args:any) => {
    try {
      const courseId = args.params.courseId;
      const body = await req.json();
      const { user, isPublished } = body;
  
      if (typeof isPublished !== 'boolean') {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
      }
  
      const updatedCourse = await db.courseList.updateMany({
        where: {
          courseId:courseId,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
        data: {
          isPublished,
        },
      });
  
      if (!updatedCourse.count) {
        return NextResponse.json({ message: 'Course not found or not authorized' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Course updated successfully' });
    } catch (error) {
      console.error('Error updating course:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
  