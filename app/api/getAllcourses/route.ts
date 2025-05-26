import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db"

export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { pageIndex } = body;
    console.log(pageIndex);

    try {
        const page = parseInt(pageIndex as string) || 0;
        const limit = 8;

        const courses = await db.courseList.findMany({
            skip: page * limit,
            take: limit,
            where: {
                isPublished: true,
            },
        });

        // const allcourses = await db.courseList.findMany({
        //     where: {
        //         isPublished:true
        //     },
        // });

        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        console.error("Error fetching courses:", error);
        NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
