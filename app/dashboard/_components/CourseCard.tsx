import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseType } from "@/types/types";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, Clock, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DropDownOptions from "./DropDownOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CourseCardProps = {
  course: CourseType;
  onRefresh: () => void;
  displayUser?: boolean;
};

export default function CourseCard({
  course,
  onRefresh,
  displayUser = false,
}: CourseCardProps) {
  const courseId = course.courseId;

  const handleOnDelete = async () => {
    try {
      const response = await axios.post("/api/deleteCourse", {
        courseId: course?.courseId,
      });
      if (response.status === 200) {
        onRefresh(); // Refresh the course list after deletion
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Status indicator */}
      {course.isPublished ? (
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-green-500/90 hover:bg-green-500 text-white border-none shadow-sm">
            Published
          </Badge>
        </div>
      ) : (
        <div className="absolute top-3 left-3 z-20">
          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-sm border-amber-500/30 text-amber-500"
          >
            Draft
          </Badge>
        </div>
      )}

      <Link href={`/course/${courseId}`} className="block overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course?.courseBanner ?? "/logo.jpg"}
            alt={course?.courseName ?? "AI Course Generator"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover overlay content */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm shadow-md"
            >
              View Course
            </Button>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <Badge
              variant="outline"
              className="mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            >
              {course.category}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">
              {course.courseOutput.topic}
            </h3>
          </div>

          {!displayUser && (
            <DropDownOptions handleDeleteCourse={() => handleOnDelete()}>
              <div className="rounded-full p-1.5 hover:bg-muted transition-colors">
                <MoreVertical size={16} className="text-muted-foreground" />
              </div>
            </DropDownOptions>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {course.courseOutput.description.substring(0, 100)}...
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.courseOutput.chapters.length} Chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.level} Level</span>
          </div>
        </div>

        {displayUser && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t">
            {/* <Image
                            src={course?.userprofileimage || "/userProfile.png"}
                            alt={course?.username || "AI Course Generator"}
                            width={24}
                            height={24}
                            className="rounded-full"
                        /> */}
            <Avatar className="h-9 w-9">
              {course?.userprofileimage ? (
                <AvatarImage
                  src={course?.userprofileimage || ""}
                  alt={course?.username || "User"}
                />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(course?.username || "")}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm font-medium">{course?.username}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
