"use client"

import { motion } from 'framer-motion';
import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner Skeleton */}
      <motion.div 
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/5 via-background to-background p-6 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full">
            <div className="h-4 w-24 bg-muted/60 rounded-full mb-3 animate-pulse"></div>
            <div className="h-8 w-64 bg-muted/60 rounded-full mb-3 animate-pulse"></div>
            <div className="h-4 w-full max-w-md bg-muted/60 rounded-full animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-muted/60 rounded-full animate-pulse"></div>
            <div className="h-10 w-32 bg-muted/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Skeleton */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-muted/60 h-9 w-9 animate-pulse"></div>
              <div>
                <div className="h-4 w-16 bg-muted/60 rounded-full mb-2 animate-pulse"></div>
                <div className="h-6 w-12 bg-muted/60 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Course List and Recent Activity Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 w-32 bg-muted/60 rounded-full mb-2 animate-pulse"></div>
                <div className="h-4 w-48 bg-muted/60 rounded-full animate-pulse"></div>
              </div>
              <div className="h-10 w-32 bg-muted/60 rounded-full animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border bg-card shadow-sm overflow-hidden animate-pulse">
                  <div className="h-40 bg-muted/40"></div>
                  <div className="p-4">
                    <div className="h-5 w-3/4 bg-muted/60 rounded-full mb-3"></div>
                    <div className="h-4 w-full bg-muted/60 rounded-full mb-3"></div>
                    <div className="h-4 w-2/3 bg-muted/60 rounded-full mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-20 bg-muted/60 rounded-full"></div>
                      <div className="h-8 w-8 bg-muted/60 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="h-5 w-32 bg-muted/60 rounded-full animate-pulse"></div>
                <div className="h-8 w-16 bg-muted/60 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="divide-y">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4">
                  <div className="rounded-full p-2 bg-muted/60 h-8 w-8 animate-pulse"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-5 w-16 bg-muted/60 rounded-full animate-pulse"></div>
                      <div className="h-4 w-24 bg-muted/60 rounded-full animate-pulse"></div>
                    </div>
                    <div className="h-5 w-full bg-muted/60 rounded-full mb-2 animate-pulse"></div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-6 w-6 bg-muted/60 rounded-full animate-pulse"></div>
                      <div className="h-4 w-16 bg-muted/60 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-8 w-8 bg-muted/60 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}