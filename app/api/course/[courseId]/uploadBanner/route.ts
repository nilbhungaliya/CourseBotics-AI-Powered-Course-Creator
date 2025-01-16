import db from "@/db"
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest)=>{
    try {
        const body = await req.json();
        const { id, fileUrl } = body;

        console.log(body);
        
        const url = fileUrl.replace("dl=0", "raw=1");
        // Save the file URL in the database
        const updatedCourse = await db.courseList.update({
            where: {
                id: id, // Assuming courseId is the unique identifier
            },
            data: {
                courseBanner: url, // Store the Dropbox URL here
            },
        }); 

        return NextResponse.json({ updatedCourse });

    } catch (error) {
        console.error("Error storing file URL:", error);
        NextResponse.json({ error: 'Failed to store file URL' });
    }
}

