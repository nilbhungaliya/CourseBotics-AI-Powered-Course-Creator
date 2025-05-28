import db from "@/db"
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received chapters data:", body);
        
        const { courseId, chapters } = body;

        // Validate input data
        if (!courseId) {
            return NextResponse.json({ success: false, error: "Missing courseId" }, { status: 400 });
        }

        if (!chapters || !Array.isArray(chapters) || chapters.length === 0) {
            return NextResponse.json({ success: false, error: "No valid chapters provided" }, { status: 400 });
        }

        // Filter out invalid chapters
        const validChapters = chapters.filter(chapter => 
            chapter && 
            typeof chapter.chapterId === 'number' && 
            chapter.content && 
            chapter.videoId
        );

        if (validChapters.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: "No valid chapters to save", 
                receivedChapters: chapters 
            }, { status: 400 });
        }

        console.log(`Processing ${validChapters.length} valid chapters out of ${chapters.length} total`);

        const results = await Promise.all(
            validChapters.map((chapter: any) => {
                console.log(`Creating chapter ${chapter.chapterId} with content:`, 
                    typeof chapter.content === 'object' ? 'Valid JSON object' : typeof chapter.content);
                
                return db.courseChapters.create({
                    data: {
                        chapterId: chapter.chapterId,
                        courseId: courseId,
                        content: chapter.content,
                        videoId: chapter.videoId,
                    },
                });
            })
        );
        
        return NextResponse.json({ 
            success: true, 
            results,
            processedCount: results.length,
            totalCount: chapters.length
        });
    } catch (error: any) {
        console.error("Error storing course chapters:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}