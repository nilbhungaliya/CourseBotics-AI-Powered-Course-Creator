import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { courseId, chapterId } = body;

    try {

        const chapterContent = await db.courseChapters.findFirst({
            where: {
                courseId: courseId as string,
                chapterId: parseInt(chapterId as string),
            },
        });

        if (!chapterContent) {
            return NextResponse.json({ message: "Chapter content not found" }, { status: 404 });
        }

        return NextResponse.json(chapterContent);
        
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}