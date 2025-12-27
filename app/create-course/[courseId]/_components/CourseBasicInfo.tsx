"use client";

import Image from "next/image";
import { LuPuzzle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CourseType } from "@/types/types";
import Link from "next/link";
import EditCourseBasicInfo from "./_edit/EditCourseBasicInfo";
import { uploadFileToCloudinary } from "../_utils/uploadFileToCloudinary";
import { saveImageUrlToDB } from "../_utils/saveImageUrlToDB";
import { FullScreenLoader } from '@/components/ui/modern-loader';
import { AnimatePresence } from 'framer-motion';

type CourseBasicInfoProps = {
  courseInfo: CourseType | null;
  onRefresh: (refresh: boolean) => void;
  edit?: boolean;
};

const CourseBasicInfo = ({
  courseInfo,
  onRefresh,
  edit = true,
}: CourseBasicInfoProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    setSelectedImage(courseInfo?.courseBanner);
    // console.log(courseInfo);
    // console.log(courseInfo?.courseBanner);
    // console.log(courseInfo?.courseOutput.topic);
    // console.log(courseInfo?.courseOutput.description);
  }, [courseInfo]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;
    setIsUploading(true);
    try {
      const updatedImageUrl = await uploadFileToCloudinary(file);
      if (courseInfo?.courseId) {
        const updatedImage = await saveImageUrlToDB(courseInfo?.courseId,updatedImageUrl);
        // console.log(updatedImage);
        
      }
      setSelectedImage(updatedImageUrl);
      onRefresh(true); // Notify parent to refresh the data
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally{
      setIsUploading(false);
    }
  };

  // console.log("Course Info", courseInfo);


  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <AnimatePresence>
        {isUploading && (
          <FullScreenLoader 
            message="Uploading Image"
            submessage="Please wait while we upload your course banner..."
          />
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="my-8 px-2">
          <h2 className="font-bold text-3xl text-primary">
            {courseInfo?.courseOutput.topic}
            {edit && (
              <EditCourseBasicInfo
                courseInfo={courseInfo}
                onRefresh={() => onRefresh(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-600 mt-3">
            {courseInfo?.courseOutput.description}
          </p>
          <h2 className="font-semibold mt-2 flex gap-2 items-center text-primary">
            <LuPuzzle /> {courseInfo?.category}
          </h2>

          {!edit && (
            <Link href={`/course/${courseInfo?.courseId}/start`}>
              <Button className="w-full mt-5">Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="image-upload">
            <Image
              src={selectedImage ? selectedImage : "/logo.jpg"}
              alt="image"
              width={200}
              height={200}
              className={`w-full rounded-xl h-[250px] object-fit ${edit && "cursor-pointer"
                }`}
            />
          </label>
          {edit && (
            <Input
              type="file"
              accept="image/*"
              id="image-upload"
              className="opacity-0"
              onChange={handleImageUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;