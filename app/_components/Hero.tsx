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
                            className="flex items-center justify-center gap-4 bg-background/80 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg border border-border/50"
                        >
                            <div className="flex -space-x-3">
                                {[
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
                                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                                ].map((src, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-background overflow-hidden ring-2 ring-primary/20 transition-transform duration-300 hover:scale-110 hover:z-10"
                                    >
                                        <img 
                                            src={src} 
                                            alt={`User ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold ring-2 ring-primary/20">
                                    +99
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Trusted by <span className="font-semibold text-foreground">1,000+</span> educators
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

