import { NextRequest, NextResponse } from "next/server";
import db from "@/db"

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { user } = body;
    console.log(user?.primaryEmailAddress?.emailAddress);
    

    if (!user) {
        return NextResponse.json({ error: "Missing required parameter: email" }, { status: 400 });
    }

    try {
        const courses = await db.courseList.findMany({
            where: {
                createdBy: user?.user?.primaryEmailAddress?.emailAddress,
            },
        });

        if (!courses || courses.length === 0) {
            return NextResponse.json({ message: "No courses found" }, { status: 404 });
        }

        return NextResponse.json(courses);
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 