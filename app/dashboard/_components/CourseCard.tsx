import { CourseType } from '@/types/types';
import React from 'react'
import { MdMenuBook } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import Link from 'next/link';
import DropDownOptions from './DropDownOptions';
import axios from 'axios';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type CourseCardProps = {
    course: CourseType;
    onRefresh: () => void;
    displayUser?: boolean;
};

function CourseCard({
    course,
    onRefresh,
    displayUser = false,
}: CourseCardProps) {

    console.log(course);

    const courseId = course.courseId;

    const handleOnDelete = async () => {
        try {
            const response = await axios.post("/api/deleteCourse", {
                courseId: course?.courseId,
            });
            console.log(response.data);
            if (response.status === 200) {
                onRefresh(); // Refresh the course list after deletion
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <div className="shadow-sm rounded-lg border hover:scale-105 transition-all duration-200 p-2 ">
            <Link href={`/course/${courseId}`}>
                <Image
                    src={course?.courseBanner ?? "/logo.jpg"}
                    alt={course?.courseName ?? "Ai Course Generator"}
                    width={300}
                    height={200}
                    priority
                    className="w-full h-[200px] object-center rounded-lg transition-all cursor-pointer"
                />
            </Link>

            <div className="p-2">
                <h2 className="font-medium text-lg flex items-center justify-between">
                    {course.courseOutput.topic}

                    {!displayUser && (
                        <DropDownOptions handleDeleteCourse={() => handleOnDelete()}>
                            <IoEllipsisVertical
                                size={20}
                                className="cursor-pointer p-[0.1em] text-zinc-700 rounded-sm outline-none"
                            />
                        </DropDownOptions>)}
                </h2>
                <p className="text-sm text-gray-400 my-1">{course.category}</p>

                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 p-1 bg-purple-50 text-primary text-sm rounded-sm">
                        <MdMenuBook /> {course.courseOutput.chapters.length} Chapters
                    </h2>
                    <h2 className="text-sm p-1 bg-purple-50 text-primary rounded-sm">
                        {course.level} Level
                    </h2>
                </div>
                {displayUser && (
                    <div className="flex justify-start items-center gap-3 mt-2">
                        <Image
                            src={course?.userprofileimage || "/userProfile.png"}
                            alt={course?.username || "Ai Course Generator"}
                            width={30}
                            height={30}
                            priority
                            className="rounded-full "
                        />
                        <Badge variant={"outline"}>{course?.username}</Badge>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseCard