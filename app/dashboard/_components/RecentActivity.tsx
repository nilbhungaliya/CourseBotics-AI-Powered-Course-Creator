"use client"

import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourseType } from '@/types/types';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Edit, Eye, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';

export default function RecentActivity() {
  const { userCourseList } = useContext(UserCourseListContext);
  const { data: session, status } = useSession();
  
  // Sort courses by most recent (assuming we don't have a createdAt field, we'll use the id as a proxy)
  // Safely handle the case where userCourseList might be undefined
  const recentCourses = userCourseList?.length 
    ? [...userCourseList].sort((a, b) => b.id - a.id).slice(0, 3)
    : [];
  
  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  const getRandomDate = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() - index * 2);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  // Don't show anything while session is loading
  if (status === 'loading') return null;
  
  // Don't show anything if there are no recent courses
  if (recentCourses.length === 0) return null;

  return (
    <motion.div
      className="rounded-xl border bg-card shadow-sm overflow-hidden mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View all
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
      
      <motion.div
        className="divide-y"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {recentCourses.map((course, index) => (
          <ActivityItem 
            key={course.id} 
            course={course} 
            date={getRandomDate(index)}
            index={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ActivityItem({ 
  course, 
  date, 
  index 
}: { 
  course: CourseType; 
  date: string;
  index: number;
}) {
  const getActivityType = (index: number) => {
    const types = [
      { icon: Plus, label: 'Created', color: 'bg-green-500/10 text-green-500' },
      { icon: Edit, label: 'Updated', color: 'bg-blue-500/10 text-blue-500' },
      { icon: Eye, label: 'Published', color: 'bg-purple-500/10 text-purple-500' },
    ];
    return types[index % types.length];
  };
  
  const activity = getActivityType(index);
  const ActivityIcon = activity.icon;
  
  return (
    <motion.div 
      className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors"
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
    >
      <div className={`rounded-full p-2 ${activity.color} mt-1`}>
        <ActivityIcon className="h-4 w-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className={activity.color.replace('bg-', 'border-').replace('text-', 'text-') + ' border-opacity-30'}>
            {activity.label}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
        </div>
        
        <Link href={`/course/${course.courseId}`} className="group">
          <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {course.courseOutput.topic}
          </h4>
        </Link>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="relative h-6 w-6 rounded-full overflow-hidden border">
            <Image
              src={course.userprofileimage || "/userProfile.png"}
              alt={course.username || "User"}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {course.username || "You"}
          </span>
        </div>
      </div>
      
      <Link href={`/course/${course.courseId}`}>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}