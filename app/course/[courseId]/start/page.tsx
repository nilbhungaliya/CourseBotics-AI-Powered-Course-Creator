"use client"
import { ChapterContentType, ChapterType, CourseType } from '@/types/types';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard';
import UserToolTip from './_components/UserToolTip';
import ChapterContent from './_components/ChapterContent';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from 'next/image';
import LoadingDialog from '@/app/create-course/_components/LoadingDialog';


function startCourse() {
    const user = useUser();
    const [course, setCourse] = useState<CourseType | null>(null);
    const param = useParams();
    const [selectedChapter, setSelectedChapter] = useState<ChapterType | null>(null);
    const [chapterContent, setChapterContent] = useState<ChapterContentType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            getCourse();
        } else {
            console.log("User is not authenticated");
        }
    }, [param]);

    const getCourse = async () => {
        setLoading(true);
        // console.log(param.courseId);;
        const courseId = param.courseId;

        const res = await axios.post(`/api/course/${courseId}`, {
            user: user,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = res.data;
        // console.log(res);
        console.log(data);
        setCourse(data);
        
        setLoading(false);
    };

    const getChapterContent = async (chapterId: number) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `/api/getChapters`, {
                courseId: course?.courseId,
                chapterId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );
            const data = await response.data;
            console.log(data);
            setChapterContent(data);
        } catch (e) {
            console.error("Error fetching chapter content:", e);
        } finally{
            setLoading(false);
        }
    };

    if(!course){
        return <LoadingDialog loading={loading} description={"Please wait"}/>
    }

    return (
        <div>
            <LoadingDialog loading={loading} description={"Please wait"}/>
            <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-sm">
                <h2 className="font-bold text-2xl text-primary p-4 text-center border-b">
                    {course?.courseOutput.topic}
                </h2>
                <div className=' overflow-y-scroll h-screen pb-5'>
                    {course?.courseOutput.chapters.map((chapter, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer hover:bg-purple-100 transition-all duration-200 ${selectedChapter?.chapterName === chapter.chapterName &&
                                "bg-purple-50"
                                }`}
                            onClick={() => {
                                console.log(index);
                                setSelectedChapter(chapter);
                                getChapterContent(index);
                            }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:ml-64">
                {selectedChapter ? (
                    <ScrollArea>
                        <ChapterContent
                            chapter={selectedChapter}
                            content={chapterContent}
                        />
                        <ScrollBar />
                    </ScrollArea>
                ) : (
                    <div className="p-10 flex justify-center flex-col items-center">
                        <Image
                            src={course?.courseBanner || "/logo.jpg"}
                            alt={course?.courseName || "AI Course Generator"}
                            width={350}
                            height={10}
                            priority
                            className="rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer mt-20"
                        />
                        <p className="felx justify-center gap-3 mt-10">
                            lets get started with the course {course?.courseOutput.topic}.
                            Click on the chapters to get started. Enjoy learning!
                        </p>
                        <p className="mt-10">
                            <UserToolTip
                                username={course?.username || "AI Course Generator"}
                                userProfileImage={course?.userprofileimage || "/userProfile.png"}
                            />
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default startCourse