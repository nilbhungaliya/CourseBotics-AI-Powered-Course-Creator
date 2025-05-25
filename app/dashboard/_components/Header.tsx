"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserButton } from "@/components/ui/user-button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  X,
  Check,
  Clock,
  BookOpen,
  Award,
  MessageSquare,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { auth, signOut } from "@/auth";
import { useSession } from 'next-auth/react';

interface HeaderProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

// Mock data for search results
interface CourseResult {
  id: string;
  title: string;
  category: string;
  image?: string;
}

// Mock data for notifications
interface Notification {
  id: string;
  type: "course" | "achievement" | "message" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export default function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CourseResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const session = useSession()

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "course",
      title: "New Course Available",
      message: "Advanced AI for Educators is now available",
      time: "2 hours ago",
      read: false,
      link: "/dashboard/explore",
    },
    {
      id: "2",
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've created your first course!",
      time: "1 day ago",
      read: false,
      link: "/dashboard",
    },
    {
      id: "3",
      type: "message",
      title: "New Comment",
      message: "Someone commented on your AI Ethics course",
      time: "3 days ago",
      read: true,
      link: "/dashboard",
    },
    {
      id: "4",
      type: "system",
      title: "System Update",
      message: "New features have been added to the platform",
      time: "1 week ago",
      read: true,
      link: "/dashboard",
    },
  ]);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mock search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setShowSearchResults(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results based on query
      const results: CourseResult[] = [
        {
          id: "1",
          title: "Introduction to AI",
          category: "Technology",
          image: "/placeholder-course.jpg",
        },
        {
          id: "2",
          title: "Machine Learning Basics",
          category: "Technology",
          image: "/placeholder-course.jpg",
        },
        {
          id: "3",
          title: "Advanced Python Programming",
          category: "Programming",
          image: "/placeholder-course.jpg",
        },
        {
          id: "4",
          title: "Data Science Fundamentals",
          category: "Data",
          image: "/placeholder-course.jpg",
        },
      ].filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  // Handle clicking outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative z-50"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </motion.div>

          <Link href="/dashboard" className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <Image
                src={"/courseBotics-logo.svg"}
                alt="CourseBotics"
                width={32}
                height={32}
                priority
                className="object-contain"
              />
              <span className="font-semibold text-lg">CourseBotics</span>
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Component */}
          <div className="relative hidden md:block" ref={searchRef}>
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="Search courses..."
                value={searchQuery}
                onValueChange={handleSearch}
                className="h-9"
              />

              {showSearchResults && (
                <CommandList className="absolute top-full left-0 right-0 mt-1 max-h-[300px] overflow-y-auto rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <>
                      {searchResults.length === 0 ? (
                        <CommandEmpty>No results found.</CommandEmpty>
                      ) : (
                        <CommandGroup heading="Courses">
                          {searchResults.map((result) => (
                            <CommandItem
                              key={result.id}
                              onSelect={() => {
                                router.push(`/course/${result.id}`);
                                setShowSearchResults(false);
                              }}
                              className="flex items-center gap-2 p-2"
                            >
                              <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                {result.image ? (
                                  <Image
                                    src={result.image}
                                    alt={result.title}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                ) : (
                                  <BookOpen className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {result.title}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {result.category}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </>
                  )}
                </CommandList>
              )}
            </Command>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Notifications */}
            <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
              <PopoverTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary animate-pulse">
                        <span className="sr-only">
                          {unreadCount} unread notifications
                        </span>
                      </span>
                    )}
                  </Button>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
                <div className="flex items-center justify-between border-b p-3">
                  <h3 className="font-medium">Notifications</h3>
                  <div className="flex gap-1">
                    {notifications.length > 0 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={markAllAsRead}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Mark all read
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={clearAllNotifications}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Clear all
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <Bell className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">
                        No notifications yet
                      </p>
                    </div>
                  ) : (
                    <div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex gap-3 p-3 hover:bg-muted/50 transition-colors ${
                            !notification.read ? "bg-muted/30" : ""
                          }`}
                          onClick={() => {
                            markAsRead(notification.id);
                            if (notification.link) {
                              router.push(notification.link);
                            }
                            setNotificationOpen(false);
                          }}
                        >
                          <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-primary"></span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <UserButton />
            </motion.div>
            {/* <form
              action={async () => {
                await signOut();
              }}
            >
              <Button
                variant="outline"
                className="rounded-full px-3 sm:px-6 py-2 h-9 text-xs sm:text-sm"
              >
                Sign out
              </Button>
            </form> */}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
