"use client";

import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import LoadingDialog from '@/app/create-course/_components/LoadingDialog';
import { CourseType } from '@/types/types';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function CoursePage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const param = useParams();
    const [course, setCourse] = useState<CourseType | null>(null);



    useEffect(() => {
        if (session?.user) {
            console.log("user:", session.user);
            param && getCourse();
        } else {
            console.log("User is not authenticated");
        }
    }, [param, session?.user]);

    const getCourse = async () => {
        setLoading(true);
        // console.log(param.courseId);
        const courseId = param.courseId;

        const res = await axios.post(`/api/course/${courseId}`, {
            user: { email: session?.user?.email },
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = res.data;
        // console.log(res);
        // console.log(data);
        setCourse(data);
        setLoading(false);
    };

    if (!course) return null;


    return (
        <div className="pt-8 px-7 md:px-20 lg:px-44">

            <LoadingDialog loading={loading} />

            <CourseBasicInfo courseInfo={course} onRefresh={() => getCourse()} edit={false} />

            <CourseDetail courseDetail={course}/>

            <ChapterList course={course} onRefresh={() => getCourse()} edit={false}/>

        </div>
    )
}


export default CoursePage;
