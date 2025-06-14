"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative border-t bg-background/50 backdrop-blur-sm">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand section */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.2,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                        >
                            <h2 className="text-2xl font-bold">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                    Course
                                </span>
                                <span className="text-foreground">Botics</span>
                            </h2>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.3,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                            className="text-sm text-muted-foreground"
                        >
                            Transform your teaching with AI-powered course creation.
                        </motion.p>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-4">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.4,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                            className="font-semibold text-foreground"
                        >
                            Quick Links
                        </motion.h3>
                        <motion.ul
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.5,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                            className="space-y-2"
                        >
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 0.6,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Features
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 0.7,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Pricing
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 0.8,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    FAQ
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.6,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                            className="font-semibold text-foreground"
                        >
                            Resources
                        </motion.h3>
                        <motion.ul
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.7,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                            className="space-y-2"
                        >
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 0.8,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Blog
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 0.9,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Documentation
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 1.0,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Support
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.8,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                            className="font-semibold text-foreground"
                        >
                            Legal
                        </motion.h3>
                        <motion.ul
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.9,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            style={{ willChange: "transform, opacity" }}
                            className="space-y-2"
                        >
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 1.0,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Privacy Policy
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 1.1,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Terms of Service
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                    duration: 1.0, 
                                    delay: 1.2,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    Cookie Policy
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </div>
                </div>

                {/* Bottom section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 1.4, 
                        delay: 1.2,
                        ease: [0.23, 1, 0.32, 1]
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    style={{ willChange: "transform, opacity" }}
                    className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} CourseBotics. All rights reserved.
                    </p>
                    <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            duration: 1.2, 
                            delay: 1.4,
                            ease: [0.23, 1, 0.32, 1]
                        }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ 
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ 
                                scale: 1.1,
                                rotate: -5,
                                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ 
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
} 