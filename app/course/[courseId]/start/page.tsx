"use client";
import { ChapterContentType, ChapterType, CourseType } from "@/types/types";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import UserToolTip from "./_components/UserToolTip";
import ChapterContent from "./_components/ChapterContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import LoadingDialog from "@/app/create-course/_components/LoadingDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ChevronLeft, 
  Menu, 
  X, 
  Clock, 
  Star, 
  Award, 
  BookOpenCheck,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

function StartCourse() {
  const router = useRouter();
  const { data: session } = useSession();
  const [course, setCourse] = useState<CourseType | null>(null);
  const param = useParams();
  const [selectedChapter, setSelectedChapter] = useState<ChapterType | null>(null);
  const [chapterContent, setChapterContent] = useState<ChapterContentType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (session?.user) {
      getCourse();
    } else {
      console.log("User is not authenticated");
    }
  }, [param, session?.user]);

  const getCourse = async () => {
    setLoading(true);
    const courseId = param.courseId;

    try {
      const res = await axios.post(
        `/api/course/${courseId}`,
        {
          user: session?.user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      setCourse(data);
      
      // Set a random progress value between 0-100 for demo purposes
      // In a real app, this would come from user's actual progress
      setProgress(Math.floor(Math.random() * 100));
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChapterContent = async (chapterId: number) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/getChapters`,
        {
          courseId: course?.courseId,
          chapterId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      setChapterContent(data);
      
      // Close sidebar on mobile when selecting a chapter
      if (isMobile) {
        setSidebarOpen(false);
      }
    } catch (e) {
      console.error("Error fetching chapter content:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return <LoadingDialog loading={loading} description={"Loading your course..."} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <LoadingDialog loading={loading} description={"Loading content..."} />
      
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div 
            className="fixed md:relative z-50 md:z-auto w-[300px] md:w-80 h-screen bg-background border-r shadow-lg md:shadow-none"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="font-bold text-xl text-foreground truncate">
                    {course?.courseOutput.topic}
                  </h2>
                </div>
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              {/* Course progress */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your progress</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              {/* Chapter list */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  <div className="text-xs uppercase text-muted-foreground font-medium tracking-wider mb-2 px-2">
                    Chapters
                  </div>
                  
                  {course?.courseOutput.chapters.map((chapter, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`
                        cursor-pointer rounded-lg mb-2 overflow-hidden
                        transition-all duration-200
                        ${selectedChapter?.chapterName === chapter.chapterName
                          ? "bg-primary/10 border border-primary/20 shadow-sm"
                          : "hover:bg-accent border border-transparent"
                        }
                      `}
                      onClick={() => {
                        setSelectedChapter(chapter);
                        getChapterContent(index);
                      }}
                    >
                      <ChapterListCard chapter={chapter} index={index} isActive={selectedChapter?.chapterName === chapter.chapterName} />
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Course info */}
              <div className="p-4 border-t bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {course?.courseOutput.chapters.reduce((acc, chapter) => acc + parseInt(chapter.duration.split(' ')[0]), 0)} mins total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-muted-foreground">
                    Certificate upon completion
                  </span>
                </div>
                <div className="mt-3">
                  <UserToolTip
                    username={course?.username || "AI Course Creator"}
                    userProfileImage={course?.userprofileimage || "/userProfile.png"}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <motion.div 
        className="flex-1 flex flex-col h-screen overflow-hidden"
        animate={{ 
          marginLeft: sidebarOpen && !isMobile ? "0" : "0",
          width: "100%" 
        }}
      >
        {/* Top navigation */}
        <header className="h-14 border-b flex items-center px-4 sticky top-0 bg-background/95 backdrop-blur z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="h-6 w-px bg-border mx-1" />
            
            <h1 className="text-lg font-medium truncate">
              {selectedChapter ? selectedChapter.chapterName : course?.courseOutput.topic}
            </h1>
          </div>
          
          {selectedChapter && (
            <div className="ml-auto flex items-center">
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {selectedChapter.duration}
              </Badge>
            </div>
          )}
        </header>
        
        {/* Content area */}
        <ScrollArea className="flex-1">
          {selectedChapter ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChapterContent
                chapter={selectedChapter}
                content={chapterContent}
              />
            </motion.div>
          ) : (
            <motion.div 
              className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl w-full bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={course?.courseBanner || "/logo.jpg"}
                    alt={course?.courseName || "AI Course Generator"}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge className="mb-2 bg-primary/90 hover:bg-primary">
                      {course?.courseOutput.level || "Beginner"}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {course?.courseOutput.topic}
                    </h1>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4" />
                      <span className="ml-1 text-sm text-muted-foreground">4.0</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <BookOpenCheck className="h-4 w-4" />
                      <span className="text-sm">{course?.courseOutput.chapters.length} chapters</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {course?.courseOutput.chapters.reduce((acc, chapter) => acc + parseInt(chapter.duration.split(' ')[0]), 0)} mins
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {course?.courseOutput.description || 
                      "This course will guide you through all the essential concepts and practical applications. Click on any chapter in the sidebar to begin your learning journey."}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="gap-2 flex-1"
                      onClick={() => {
                        if (course?.courseOutput.chapters.length > 0) {
                          setSelectedChapter(course.courseOutput.chapters[0]);
                          getChapterContent(0);
                        }
                      }}
                    >
                      Start Learning
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="gap-2 flex-1">
                      <BookOpen className="h-4 w-4" />
                      Course Overview
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </ScrollArea>
      </motion.div>
      <div>
      </div>
      
    </div>
    
  );
}

export default StartCourse;