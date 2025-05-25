"use client"

import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Award } from 'lucide-react';
import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';

export default function CourseStats() {
  const { userCourseList } = useContext(UserCourseListContext);
  const { data: session, status } = useSession();
  
  // Calculate stats - safely handle the case where userCourseList might be undefined
  const totalCourses = userCourseList?.length || 0;
  const totalChapters = userCourseList?.reduce((acc, course) => 
    acc + (course.courseOutput?.chapters?.length || 0), 0) || 0;
  const publishedCourses = userCourseList?.filter(course => course.isPublished)?.length || 0;
  
  // Calculate average course duration
  const totalDuration = userCourseList?.reduce((acc, course) => {
    const durationStr = course.courseOutput?.duration || "0";
    const durationNum = parseInt(durationStr.split(' ')[0]) || 0;
    return acc + durationNum;
  }, 0) || 0;
  
  const avgDuration = totalCourses > 0 ? Math.round(totalDuration / totalCourses) : 0;
  
  const stats = [
    {
      title: "Total Courses",
      value: totalCourses,
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Chapters",
      value: totalChapters,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Published",
      value: publishedCourses,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Avg. Duration",
      value: `${avgDuration} min`,
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Don't show anything while session is loading
  if (status === 'loading') return null;
  
  // Don't show anything if there are no courses
  if (totalCourses === 0) return null;

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h4 className="text-2xl font-bold">{stat.value}</h4>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}