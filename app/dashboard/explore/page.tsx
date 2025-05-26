"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourseType } from '@/types/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SkeletonLoading from '../_components/SkeletonLoading';
import CourseCard from '../_components/CourseCard';

export default function Explore() {
  const [courseList, setCourseList] = useState<CourseType[] | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCourses();
  }, [pageIndex]);

  const getAllCourses = async () => {
    setLoading(true);
    // console.log(pageIndex);
    
    try {
      const response = await axios.post("/api/getAllcourses", {
        pageIndex
      });
      const data = response.data; 
      // console.log(data);
      setCourseList(data); // Assign the response data to the state
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Courses</h2>
      <p>Explore courses build with AI by Other Users</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
        {courseList ? (
          courseList?.map((course) => (
            <div key={course.courseId}>
              <CourseCard
                course={course}
                onRefresh={() => getAllCourses()}
                displayUser={true}
              />
            </div>
          ))
        ) : (
          <SkeletonLoading items={8} />
        )}
      </div>

      <div className="flex justify-between mt-5 items-center">
        <Button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex == 0}
        >
          Prev
        </Button>
        <Badge className='text-white'>Page : {pageIndex + 1}</Badge>
        <Button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={courseList?.length !== 8}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

