"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import React, { useContext } from 'react'
import { useSession } from 'next-auth/react';

export default function AddCourse() {
    const { data: session, status } = useSession();
    const { userCourseList } = useContext(UserCourseListContext);

    if (status !== 'authenticated' || !session) {
        return null;
    }

    return (
        <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <motion.h1 
                    className="text-2xl md:text-3xl font-bold tracking-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    Welcome back, <span className="text-primary">{session.user?.name || 'Creator'}</span>
                </motion.h1>
                <motion.p 
                    className="text-sm text-muted-foreground mt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    Create AI-powered courses, share with your audience, and monetize your knowledge
                </motion.p>
            </div>
            
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <Link href={userCourseList.length >= 5 ? "/dashboard/upgrade" : "/create-course"}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 font-medium transition-all duration-200 shadow-md hover:shadow-lg gap-2">
                        <Sparkles className="h-4 w-4" />
                        Create AI Course
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

