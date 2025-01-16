import { NextRequest, NextResponse } from "next/server";
import db from "@/db"

export const POST = async (req: NextRequest)=>{
    try {

        const body = await req.json();
        const { courseId } = body;

        const deletedCourse = await db.courseList.delete({
            where: {
                courseId: courseId,
            },
        });
        return NextResponse.json({ message: "Course deleted successfully", deletedCourse }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}