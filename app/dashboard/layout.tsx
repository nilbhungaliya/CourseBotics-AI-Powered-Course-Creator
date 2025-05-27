"use client"
import React, { useState, useEffect } from 'react'
import SideBar from './_components/SideBar';
import Header from './_components/Header';
import { UserCourseListContext } from '../_context/UserCourseListContext';
import { CourseType } from '@/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [userCourseList, setUserCourseList] = useState<CourseType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);

  // Initialize sidebar state from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      try {
        const savedSidebarState = localStorage.getItem('dashboardSidebarOpen');
        if (savedSidebarState !== null) {
          setIsSidebarOpen(savedSidebarState === 'true');
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }
  }, []);

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('dashboardSidebarOpen', isSidebarOpen.toString());
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }, [isSidebarOpen, isMounted]);
  
  // Listen for custom event to update sidebar state
  useEffect(() => {
    const handleSidebarStateChanged = () => {
      if (typeof window !== 'undefined') {
        try {
          const savedSidebarState = localStorage.getItem('dashboardSidebarOpen');
          if (savedSidebarState !== null) {
            setIsSidebarOpen(savedSidebarState === 'true');
          }
        } catch (error) {
          console.error('Error reading from localStorage:', error);
        }
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('sidebarStateChanged', handleSidebarStateChanged);
      return () => {
        window.removeEventListener('sidebarStateChanged', handleSidebarStateChanged);
      };
    }
  }, []);

  // Reset scroll position when pathname changes
  useEffect(() => {
    const mainContent = document.getElementById('dashboard-main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [pathname]);
  
  // Handle session state
  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      // Add a small delay to ensure session is fully propagated to child components
      const timer = setTimeout(() => {
        setIsSessionReady(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Don't render until client-side hydration is complete
  if (!isMounted) {
    return null;
  }
  
  // Show a simple loading indicator while session is loading or not ready
  if (status === 'loading' || !isSessionReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar for desktop */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div 
              className="hidden md:block h-screen"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SideBar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />
          )}
        </AnimatePresence>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              className="md:hidden fixed top-0 left-0 h-screen z-50 w-64"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.3 }}
            >
              <SideBar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <motion.div 
          className="flex-1 flex flex-col overflow-hidden"
          animate={{ 
            width: isSidebarOpen ? "calc(100% - 256px)" : "100%" 
          }}
          transition={{ duration: 0.3 }}
          style={{ 
            marginLeft: isSidebarOpen ? (typeof window !== 'undefined' && window.innerWidth >= 768 ? "0" : "0") : "0"
          }}
        >
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          
          <motion.main 
            id="dashboard-main-content"
            className="flex-1 overflow-y-auto p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto">
              {children}
            </div>
          </motion.main>
        </motion.div>
      </div>
    </UserCourseListContext.Provider>
  )
}

