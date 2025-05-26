"use client";

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import CourseDetail from './_components/CourseDetail';
import CourseBasicInfo from './_components/CourseBasicInfo';
import LoadingDialog from '../_components/LoadingDialog';
import { CourseType } from '@/types/types';
import { GenerateCourseContent } from './_utils/GenerateCourseContent';

function CoursePageLayout() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
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
        // console.log(param.courseId);;
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

    const handleGenerateCourseContent = async () => {
        setLoading(true)
        const courseId = param.courseId;
        console.log(course);
        const Chapterdata = await GenerateCourseContent(course, setLoading);
        console.log({Chapterdata});

        const res = await axios.patch(`/api/course/${courseId}`, {
            isPublished: true,
            user: { email: session?.user?.email },
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = res.data;
        // console.log(data);
        setLoading(false);
        router.replace(`/create-course/${param.courseId}/finish`);
    }

    return (
        <div className="pt-8 px-7 md:px-20 lg:px-44">
            <h2 className="font-bold text-center text-2xl text-purple-900">Course Layout</h2>

            <LoadingDialog loading={loading} />

            <CourseBasicInfo courseInfo={course} onRefresh={() => getCourse()} />

            <CourseDetail courseDetail={course} />

            <ChapterList course={course} onRefresh={() => getCourse()} />

            <Button className="my-10" onClick={handleGenerateCourseContent}>
                Generate Course Content
            </Button>
        </div>
    )
}


export default CoursePageLayout;
