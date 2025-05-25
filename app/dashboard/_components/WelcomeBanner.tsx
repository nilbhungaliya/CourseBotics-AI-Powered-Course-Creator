"use client"

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function WelcomeBanner() {
  const { data: session, status } = useSession();
  const currentHour = new Date().getHours();
  
  let greeting = "Hello";
  if (currentHour < 12) greeting = "Good morning";
  else if (currentHour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  // Show a loading state while session is being fetched
  if (status === 'loading') {
    return (
      <motion.div 
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/10 via-background to-background p-6 shadow-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-24 animate-pulse bg-muted/50 rounded-lg"></div>
      </motion.div>
    );
  }
  
  // Don't show if not authenticated
  if (status !== 'authenticated' || !session?.user) return null;

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/10 via-background to-background p-6 shadow-sm mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.div 
            className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">AI Course Creator</p>
          </motion.div>
          
          <motion.h1 
            className="text-2xl md:text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {greeting}, <span className="text-primary">{session.user?.name || 'Creator'}</span>
          </motion.h1>
          
          <motion.p 
            className="text-sm text-muted-foreground mt-1 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Create AI-powered courses, share with your audience, and monetize your knowledge. Our platform makes it easy to transform your expertise into engaging learning experiences.
          </motion.p>
        </div>
        
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Link href="/create-course">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 font-medium transition-all duration-200 shadow-md hover:shadow-lg gap-2">
              <Sparkles className="h-4 w-4" />
              Create AI Course
            </Button>
          </Link>
          <Link href="/dashboard/explore">
            <Button variant="outline" className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-full px-6 py-2.5">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
