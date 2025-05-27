"use client"
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress"
import { RotatingText } from "./RotatingText";
import { navList } from "../_constants/navList";
import { usePathname } from "next/navigation";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const path = usePathname();
  const { userCourseList } = useContext(UserCourseListContext);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Function to check if a nav item is active
  const isActive = (itemRoute: string) => {
    // Exact match for dashboard home
    if (itemRoute === '/dashboard' && path === '/dashboard') {
      return true;
    }
    
    // For other routes, check if the path starts with the route
    // This ensures that sub-pages like /dashboard/explore/123 still highlight the "Explore" nav item
    return path.startsWith(itemRoute) && itemRoute !== '/dashboard';
  };
  
  // Function to close sidebar on mobile when clicking a link
  const closeSidebarOnMobile = () => {
    if (isMobile) {
      try {
        // Get the sidebar state from localStorage
        const sidebarOpen = localStorage.getItem('dashboardSidebarOpen');
        if (sidebarOpen === 'true') {
          // Update localStorage
          localStorage.setItem('dashboardSidebarOpen', 'false');
          // Dispatch a custom event to notify the layout
          window.dispatchEvent(new CustomEvent('sidebarStateChanged'));
        }
      } catch (error) {
        console.error('Error handling sidebar state:', error);
      }
    }
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.aside 
      className="h-screen w-64 border-r bg-sidebar dark:bg-sidebar flex flex-col overflow-y-auto shadow-lg md:shadow-none"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      {isMobile && (
        <div className="flex justify-end p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => {
              try {
                localStorage.setItem('dashboardSidebarOpen', 'false');
                window.dispatchEvent(new CustomEvent('sidebarStateChanged'));
              } catch (error) {
                console.error('Error closing sidebar:', error);
              }
            }}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      )}
      <div className="p-6">
        <div className="mb-8">
          <RotatingText />
        </div>
        
        <nav>
          <div className="text-xs uppercase text-muted-foreground font-medium tracking-wider mb-3 px-3">
            Main
          </div>
          <div className="space-y-1.5 mb-6">
            {navList.slice(0, 2).map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link
                  href={item.route}
                  onClick={closeSidebarOnMobile}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive(item.route) 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 shadow-sm' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive(item.route) ? 'text-primary' : 'text-sidebar-foreground'}`} />
                  <span>{item.name}</span>
                  {item.name === "Explore" && (
                    <Badge variant="outline" className="ml-auto text-xs bg-primary/10 text-primary border-primary/20">
                      New
                    </Badge>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-xs uppercase text-muted-foreground font-medium tracking-wider mb-3 px-3">
            Account
          </div>
          <div className="space-y-1.5">
            {navList.slice(2).map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link
                  href={item.route}
                  onClick={closeSidebarOnMobile}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive(item.route) 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 shadow-sm' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive(item.route) ? 'text-primary' : 'text-sidebar-foreground'}`} />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <motion.div 
          className="rounded-xl border bg-card p-5 shadow-sm overflow-hidden relative"
          variants={itemVariants}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-primary/10 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Course Usage</h3>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            
            <Progress 
              value={(userCourseList.length / 5) * 100} 
              className="h-2 mb-2"
            />
            
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                {userCourseList.length} of 5 used
              </p>
              <Link 
                href="/dashboard/upgrade" 
                className="text-primary hover:underline text-xs font-medium"
                onClick={closeSidebarOnMobile}
              >
                Upgrade
              </Link>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-xs text-center text-muted-foreground"
          variants={itemVariants}
        >
          <p>© 2024 CourseBotics</p>
        </motion.div>
      </div>
    </motion.aside>
  );
}


