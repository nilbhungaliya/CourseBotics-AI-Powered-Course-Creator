import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"
import { log } from "node:console";

export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
    try {

        const body = await req.json();
        const { courseId } = body;

        const course = await db.courseList.findUnique({
            where: { courseId },
        });
        
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }else{
            console.log("found");   
        }

        const deletedCourse = await db.courseList.deleteMany({
            where: {
                courseId: courseId,
            },
        });
        // const deletedCourseChapters = await db.courseChapters.deleteMany({
        //     where: {
        //         courseId: courseId,
        //     },
        // });

        return NextResponse.json({ message: "Course deleted successfully"}, { status: 200 });
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return NextResponse.json({ errorMessage: "Internal server error",error }, { status: 500 });
    }
}