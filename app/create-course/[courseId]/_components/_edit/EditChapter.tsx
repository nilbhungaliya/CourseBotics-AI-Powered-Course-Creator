import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaEdit } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CourseType } from '@/types/types';
import axios from 'axios';

type EditChapterProps = {
    course: CourseType;
    index: number;
    onRefresh: (refresh: boolean) => void;
};

function EditChapter({ course, index, onRefresh }: EditChapterProps) {

    const chapters = course.courseOutput.chapters; // this is array of object
    const [chapterName, setChapterName] = useState<string>("");
    const [chapterAbout, setChapterAbout] = useState<string>("");

    useEffect(() => {
        if (course) {
            setChapterName(chapters[index]?.chapterName);
            setChapterAbout(chapters[index]?.about);
        }
    }, [course, index]);

    if (!chapters || chapters.length === 0) {
        return <p>No chapters available to edit.</p>;
    }

    const updateChapterInfo = async () => {
        try {

            console.log(chapterName);
            console.log(chapterAbout);

            const updatedChapterInfo = {
                id: course.id, // Send the course ID
                chapterIndex: index, // Send the chapter index to identify which chapter to update
                chapterName,
                about: chapterAbout,
            };

            console.log(updatedChapterInfo);

            const response = await axios.put(`/api/course/${course?.courseId}/updateChapter`, updatedChapterInfo);

            console.log('Updated course:', response.data.updatedCourse);
            onRefresh(true);
        }
        catch (error) {
            console.error('Error updating course chapter info:', error);
        }
    }

    return (
        <Dialog>
          <DialogTrigger>
          <FaEdit className="text-primary mx-3"/>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Chapter</DialogTitle>
              <DialogDescription>
                <div className="mt-3">
                  <label htmlFor="">Chapter Name</label>
                  <Input
                    placeholder="Enter course title"
                    defaultValue={chapters[index]?.chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Chapter Description</label>
                  <Textarea
                    className="h-40"
                    placeholder="Enter course description"
                    defaultValue={chapters[index]?.about}
                    onChange={(e) => setChapterAbout(e.target.value)}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={updateChapterInfo}>Update</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
}

export default EditChapter