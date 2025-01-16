"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useContext } from 'react'
import { FaWandMagicSparkles } from "react-icons/fa6";

function AddCourse() {
    const { isSignedIn, user } = useUser();
    const { userCourseList } = useContext(UserCourseListContext);

    if (!isSignedIn) {
        return null;
    }

    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-3xl">
                    Hello, <span className="font-bold">{user?.fullName}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                    Create new course with AI, share with friends and Earn some money
                </p>
            </div>
            <Link href={userCourseList.length >= 5 ? "/dashboard/upgrade" : "/create-course"}>
                <Button className="gap-2 text-white">
                    <FaWandMagicSparkles />
                    Create AI Course
                </Button>
            </Link>
        </div>
    );
};


export default AddCourse