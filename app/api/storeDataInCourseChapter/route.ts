import db from "@/db"
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // console.log(body);
        
        const { courseId, chapters } = body;

        const results = await Promise.all(
            chapters.map((chapter:any) =>
              db.courseChapters.create({
                data: {
                  chapterId: chapter.chapterId,
                  courseId: courseId,
                  content: chapter.content,
                  videoId: chapter.videoId,
                },
              })
            )
          );
        return NextResponse.json({ success: true, results });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}