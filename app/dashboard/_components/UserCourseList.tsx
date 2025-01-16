"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { CourseType } from '@/types/types';
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import SkeletonLoading from './SkeletonLoading';

function UserCourseList() {
    const user = useUser();
    const [courses, setCourses] = useState<CourseType[] | null>(null); 
    const { setUserCourseList } = useContext(UserCourseListContext);

    useEffect(() => {
        if (user) {
            getUserCourses();
        } else {
            console.log("User is not authenticated");
        }
    }, []);

    const getUserCourses = async () => {
        try {
            console.log(user);
            
            const response = await axios.post("/api/getUserCourses", {
                user,
            });

            const courseData = response.data;
            console.log(courseData);

            setCourses(courseData as CourseType[]);
            setUserCourseList(courseData as CourseType[]);
        } catch (error) {
            console.error("Error fetching user courses:", error);
            if (axios.isAxiosError(error)) {
                console.error("Axios Error:", error.response?.data);
            }
        }
    };

    if (courses?.length === 0) return <div className="flex justify-center items-center mt-44">No courses found</div>;
    return (
        <div className="mt-10">
            <h2 className="font-medium text-lg mb-2">My AI Courses</h2>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {courses ? (
                    courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            course={course}
                            onRefresh={() => getUserCourses()}
                        />
                    ))
                ) : (
                    <SkeletonLoading items={5} />
                )}
            </div>
        </div>
    );
}

export default UserCourseList