"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { CourseType } from '@/types/types';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import SkeletonLoading from './SkeletonLoading';
import { useSession } from 'next-auth/react';

export default function UserCourseList() {
    const { data: session, status } = useSession();
    const [courses, setCourses] = useState<CourseType[] | null>(null); 
    const { setUserCourseList } = useContext(UserCourseListContext);
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        // For debugging purposes
        console.log({session});
        console.log(status);
        
        if (status === 'loading') {
            // Session is still loading, don't do anything yet
            setIsLoading(true);
            return;
        }
        
        if (status === 'authenticated' && session?.user?.email) {
            // Only fetch courses if we haven't loaded them yet or if we need to refresh
            if (!hasLoaded) {
                getUserCourses(session.user.email);
                setHasLoaded(true);
            }
            return;
        }
        
        if (status === 'unauthenticated') {
            console.log("User is not authenticated");
            setIsLoading(false);
            // We'll handle this case in the dashboard page
        }
    }, [status, session, hasLoaded]);

    const refreshCourses = () => {
        if (status === 'authenticated' && session?.user?.email) {
            setHasLoaded(false); // Reset hasLoaded to trigger a refresh
        }
    };

    const getUserCourses = async (email: string) => {
        setIsLoading(true);
        try {
            console.log("Fetching courses for email:", email);
            const response = await axios.post("/api/getUserCourses", {
                email,
            });

            const courseData = response.data;
            setCourses(courseData as CourseType[]);
            setUserCourseList(courseData as CourseType[]);
            setHasLoaded(true);
        } catch (error) {
            console.error("Error fetching user courses:", error);
            if (axios.isAxiosError(error)) {
                console.error("Axios Error:", error.response?.data);
            }
            setHasLoaded(true); // Mark as loaded even on error
        } finally {
            setIsLoading(false);
        }
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

    if (courses?.length === 0) {
        return (
            <motion.div 
                className="flex flex-col items-center justify-center mt-20 p-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-10 w-10 text-primary"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                    You haven&apos;t created any courses yet. Start creating your first AI-powered course now!
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">My AI Courses</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage and track your created courses
                    </p>
                </div>
                
                <Link href="/create-course">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 font-medium transition-all duration-200 shadow-md hover:shadow-lg gap-2">
                        <Sparkles className="h-4 w-4" />
                        Create Course
                    </Button>
                </Link>
            </div>
            
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkeletonLoading items={4} />
                </div>
            ) : (
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {courses?.map((course, index) => (
                        <CourseCard
                            key={index}
                            course={course}
                            onRefresh={refreshCourses}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}

