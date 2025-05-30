'use client'

import React, { useState, useEffect } from 'react'
import UserCourseList from './_components/UserCourseList'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseStats from './_components/CourseStats'
import RecentActivity from './_components/RecentActivity'
import { PageTransition, SlideInLeft, SlideInRight } from '@/components/ui/page-transition'
import { useSession } from 'next-auth/react'
import DashboardLoading from './_components/DashboardLoading'

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);
  
  // This ensures we're rendering on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Auto-refresh once when the page loads after login
  useEffect(() => {
    // Only run this effect on the client side
    console.log({session});
    
    if (!isClient) return;
    
    // If URL contains login=success and we haven't refreshed yet
    if (window.location.search.includes('login=success') && !hasRefreshed) {
      console.log('Auto-refreshing dashboard after login...');
      
      // Set the flag to prevent multiple refreshes
      setHasRefreshed(true);
      
      // Clear the URL parameter without refreshing
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [isClient, hasRefreshed]);
  
  // Show loading state while not on client or session is loading
  if (!isClient || status === 'loading') {
    return <DashboardLoading />;
  }
  
  // If user is not authenticated, show a message
  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">Please sign in to access your dashboard</p>
        </div>
      </div>
    );
  }
  
  return (
    <PageTransition className="space-y-6">
      <WelcomeBanner />
      
      <CourseStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SlideInLeft className="lg:col-span-2" delay={0.1}>
          <UserCourseList />
        </SlideInLeft>
        
        <SlideInRight className="space-y-6" delay={0.2}>
          <RecentActivity />
        </SlideInRight>
      </div>
    </PageTransition>
  )
}