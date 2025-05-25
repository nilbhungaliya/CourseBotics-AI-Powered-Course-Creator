"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 dark:from-background dark:via-background dark:to-background/90" />
            
            {/* Decorative elements - adjusted for better scaling */}
            <div className="absolute top-0 left-0 right-0 h-[50vh] max-h-[500px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent dark:from-primary/10 dark:via-primary/5 blur-3xl" />
            <div className="absolute -top-[20vh] -left-[20vw] h-[50vh] w-[50vw] max-h-[600px] max-w-[600px] rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
            <div className="absolute -bottom-[20vh] -right-[20vw] h-[50vh] w-[50vw] max-h-[600px] max-w-[600px] rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
            
            <div className="max-w-screen-2xl relative mx-auto px-4 md:px-6 lg:px-8">
                <motion.div 
                    className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] 2xl:grid-cols-[1fr_600px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                        <div className="space-y-4 md:space-y-6">
                            <motion.div variants={itemVariants}>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                                    <span className="text-primary">Course</span>Botics
                                </h1>
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <p className="max-w-[600px] text-sm text-gray-500 sm:text-base md:text-lg lg:text-xl dark:text-gray-400">
                                    Revolutionize your course creation with CourseBotics AI-powered platform. Deliver engaging and high-quality courses in minutes, not days.
                                </p>
                            </motion.div>
                            
                            <motion.div 
                                className="flex flex-col gap-3 sm:flex-row"
                                variants={itemVariants}
                            >
                                <Link href="/sign-up">
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 sm:px-6 py-2 h-10 text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto">
                                        Get Started
                                    </Button>
                                </Link>
                                <Link href="#features">
                                    <Button variant="outline" className="rounded-full px-4 sm:px-6 py-2 h-10 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 w-full sm:w-auto">
                                        Learn More
                                    </Button>
                                </Link>
                            </motion.div>
                            
                            <motion.div 
                                className="flex items-center gap-3 text-xs sm:text-sm"
                                variants={itemVariants}
                            >
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-background bg-gray-200 dark:bg-gray-800" />
                                    ))}
                                </div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    Trusted by <span className="font-medium text-foreground">1,000+</span> educators
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    
                    <motion.div 
                        className="flex items-center justify-center mt-6 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        <div className="relative w-full aspect-video sm:h-[300px] md:h-[320px] lg:h-[350px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-1 shadow-xl dark:from-primary/10 dark:via-primary/5">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent dark:from-primary/5" />
                            <div className="absolute inset-[1px] rounded-lg bg-white dark:bg-gray-950">
                                <div className="absolute inset-0 bg-grid-black/5 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-white/5" />
                                <Image
                                    src="/auth_bg1.jpeg"
                                    alt="Course Preview"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

