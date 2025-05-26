"use client";
import { CourseType } from '@/types/types';
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import Link from 'next/link';
import { IoCopyOutline } from "react-icons/io5";


function Finish() {
  const { data: session } = useSession();
  const param = useParams();

  const [course, setCourse] = useState<CourseType | null>(null);

  // Router might be needed in the future
  const COURSE_LINK = `${process.env.NEXT_PUBLIC_DOMAIN}/course/${course?.courseId}/start`;

  const getCourse = async () => {
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
    setCourse(data as CourseType);
  };

  useEffect(() => {
    if (session?.user) {
      // console.log("user:", session.user);
      if (param) {
        getCourse();
      }
    } else {
      // console.log("User is not authenticated");
    }
  }, [param, session?.user]);

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats! Your course is Ready
      </h2>

      <CourseBasicInfo
        courseInfo={course}
        onRefresh={() => console.log("Refershing")}
      />

      {/* Add aslo the share button here */}
      <h2 className="mt-3">Course URL</h2>
      <h2 className="text-center font-bold text-gray-400 border p-2 rounded flex gap-5 items-center">
        <Link href={COURSE_LINK} className="cursor-pointer hover:text-primary transition-all duration-200">{COURSE_LINK}</Link>
        <IoCopyOutline
          className="h-5 w-5 cursor-pointer hover:text-primary transition-all duration-200 hover:scale-110"
          onClick={async () => await navigator.clipboard.writeText(COURSE_LINK)}
        />
      </h2>
    </div>
  );
}

export default Finish