"use client";

import Image from "next/image";
import { LuPuzzle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
// import { uploadFilesToFirebase } from "../_utils/uploadFilesToFirebase";
import { CourseType } from "@/types/types";
import Link from "next/link";
import EditCourseBasicInfo from "./_edit/EditCourseBasicInfo";
import { uploadFilesToDropbox } from "../_utils/uploadFileToDropbox";

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

  useEffect(() => {
    setSelectedImage(courseInfo?.courseBanner);
    console.log("Using refresh token:", process.env.NEXT_PUBLIC_DROPBOX_REFRESH_TOKEN);
    console.log(courseInfo);
    console.log(courseInfo?.courseBanner);
    // console.log(courseInfo?.courseOutput.topic);
    // console.log(courseInfo?.courseOutput.description);
  }, [courseInfo]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0) as Blob;
    // setSelectedImage(URL.createObjectURL(file));
    const updatedCourse = await uploadFilesToDropbox(file, courseInfo!)
    console.log(updatedCourse);
    

    try {
      const updatedCourse = await uploadFilesToDropbox(file, courseInfo!);
      setSelectedImage(updatedCourse.updatedCourse.courseBanner);
      onRefresh(true); // Notify parent to refresh the data
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // console.log("Course Info", courseInfo);


  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
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