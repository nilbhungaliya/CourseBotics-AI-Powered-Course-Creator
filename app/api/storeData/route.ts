import { NextResponse } from 'next/server';
import db from "@/lib/db" // Ensure this is correctly set up

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'; // Add this at the top of your file

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, userInput, data, user } = body;

    const result = await db.courseList.create({
      data: {
        courseId: id,
        courseName: userInput.topic || "Unknown Topic", // Provide fallback
        category: userInput.category || "Unknown Category", // Provide fallback
        level: userInput.difficulty || "Unknown Level", // Provide fallback
        courseOutput: data, // Ensure this is of type InputJsonValue
        createdBy: user?.email || null,
        username: user?.name || null,
        userprofileimage: user?.image || null,
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
