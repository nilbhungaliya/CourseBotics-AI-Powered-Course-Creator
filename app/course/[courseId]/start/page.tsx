"use client"
import { ChapterContentType, ChapterType, CourseType } from '@/types/types';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard';

function startCourse() {
    const user = useUser();
    const [course, setCourse] = useState<CourseType | null>(null);
    const param = useParams();
    const [selectedChapter, setSelectedChapter] = useState<ChapterType | null>(null);
    const [chapterContent, setChapterContent] = useState<ChapterContentType | null>(null);

    useEffect(() => {
        if (user) {
            getCourse();
        } else {
            console.log("User is not authenticated");
        }
    }, [param]);

    const getCourse = async () => {
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
    };

    const getChapterContent = async (chapterId: number) => {
        try {
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
          const data = response.data;
          console.log(data);
          setChapterContent(data);
        } catch (e) {
          console.error("Error fetching chapter content:", e);
        }
      };

    return (
        <div>
            <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-sm">
                <h2 className="font-medium text-lg bg-primary p-4 text-white text-center">
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
                    <div>
                        {/* <ChapterContent
                            chapter={selectedChapter}
                            content={chapterContent}
                        />
                        <ScrollProgress /> */}
                    </div>
                ) : (
                    <div className="p-10 flex justify-center flex-col items-center">
                        <Image
                            src={course?.courseBanner || "/thumbnail.png"}
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
                            {/* <UserToolTip
                                username={course.username || "AI Course Generator"}
                                userProfileImage={course.userprofileimage || "/userProfile.png"}
                            /> */}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default startCourse