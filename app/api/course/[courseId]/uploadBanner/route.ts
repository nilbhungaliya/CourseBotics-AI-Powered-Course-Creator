import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'

export const POST = async (req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) => {
  try {
    // Await params as required by Next.js 15
    const { courseId } = await params;
    const body = await req.json();
    const { fileUrl } = body;

    // console.log("Body: " + body);

    const url = fileUrl.replace("dl=0", "raw=1");
    // Save the file URL in the database
    const updatedCourse = await db.courseList.update({
      where: {
        courseId: courseId, // Assuming courseId is the unique identifier
      },
      data: {
        courseBanner: url, // Store the Dropbox URL here
      },
    });
    const courseBanner = updatedCourse.courseBanner;

    return NextResponse.json({ courseBanner });
  } catch (error) {
    console.error("Error storing file URL:", error);
    return NextResponse.json({ error: "Failed to store file URL" });
  }
};
