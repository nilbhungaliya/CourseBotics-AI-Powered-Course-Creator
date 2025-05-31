"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative min-h-[60vh] overflow-hidden">
            {/* Main content */}
            <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 pt-20 pb-12 md:pt-32 md:pb-16">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                        Course
                                    </span>
                                    <span className="text-foreground">Botics</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg text-muted-foreground md:text-xl"
                            >
                                Revolutionize your course creation with CourseBotics AI-powered platform. 
                                Deliver engaging and high-quality courses in minutes, not days.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href="/sign-up">
                                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-medium border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                                    Learn More
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex items-center justify-center gap-4"
                        >
                            <div className="flex -space-x-3">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-primary/10"
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Trusted by <span className="font-medium text-foreground">1,000+</span> educators
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

