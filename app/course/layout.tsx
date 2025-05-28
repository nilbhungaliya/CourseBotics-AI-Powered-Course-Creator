"use client";
import React, { useEffect, useState } from "react";
import { UserInputContext } from "../_context/UserInputContext";
import { CourseType, UserInputType } from "@/types/types";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import Header from "../dashboard/_components/Header";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from "next/navigation";
import SideBar from "../dashboard/_components/SideBar";

function CreateCourselayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInput, setUserInput] = useState<UserInputType>({});
  const [userCourseList, setUserCourseList] = useState<CourseType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
      try {
        const savedSidebarState = localStorage.getItem("dashboardSidebarOpen");
        if (savedSidebarState !== null) {
          setIsSidebarOpen(savedSidebarState === "true");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    }
  }, []);

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      try {
        localStorage.setItem("dashboardSidebarOpen", isSidebarOpen.toString());
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [isSidebarOpen, isMounted]);

  // Listen for custom event to update sidebar state
  useEffect(() => {
    const handleSidebarStateChanged = () => {
      if (typeof window !== "undefined") {
        try {
          const savedSidebarState = localStorage.getItem(
            "dashboardSidebarOpen"
          );
          if (savedSidebarState !== null) {
            setIsSidebarOpen(savedSidebarState === "true");
          }
        } catch (error) {
          console.error("Error reading from localStorage:", error);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("sidebarStateChanged", handleSidebarStateChanged);
      return () => {
        window.removeEventListener(
          "sidebarStateChanged",
          handleSidebarStateChanged
        );
      };
    }
  }, []);

  // Reset scroll position when pathname changes
  useEffect(() => {
    const mainContent = document.getElementById("create-course-main-content");
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Don't render until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  // return (
  //   <div>
  //     <UserInputContext.Provider value={{ userInput, setUserInput }}>
  //       <UserCourseListContext.Provider
  //         value={{ userCourseList, setUserCourseList }}
  //       >
  //         <>
  //           <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
  //           <div>{children}</div>
  //         </>
  //       </UserCourseListContext.Provider>
  //     </UserInputContext.Provider>
  //   </div>
  // );
  return (
    <UserInputContext.Provider value={{ userInput, setUserInput }}>
      <UserCourseListContext.Provider
        value={{ userCourseList, setUserCourseList }}
      >
        <div className="flex h-screen overflow-hidden">
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
          <div className="flex-1 flex flex-col overflow-auto">
            <Header
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </div>
      </UserCourseListContext.Provider>
    </UserInputContext.Provider>
  );
}

export default CreateCourselayout;
