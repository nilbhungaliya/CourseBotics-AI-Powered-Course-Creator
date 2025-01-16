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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FaEdit } from "react-icons/fa";
import { CourseType } from '@/types/types';
import { Button } from '@/components/ui/button';
import axios from 'axios';


type EditCourseBasicInfoProps = {
    courseInfo: CourseType | null;
    onRefresh: (refresh: boolean) => void;
};

function EditCourseBasicInfo({ courseInfo, onRefresh }: EditCourseBasicInfoProps) {
    const [courseTitle, setCourseTitle] = useState<string>("");
    const [courseDescription, setCourseDescription] = useState<string>("");

    useEffect(() => {
        if (courseInfo) {
            setCourseTitle(courseInfo.courseOutput.topic);
            setCourseDescription(courseInfo.courseOutput.description);
        }
    }, [courseInfo]);

    const updateCourseInfo = async () => {
        try {

            console.log(courseDescription);

            const updatedCourseInfo = {
                id: courseInfo?.id, // Ensure you send the course ID
                courseOutput: {
                    topic: courseTitle,
                    description: courseDescription,
                },
            };
            console.log(updatedCourseInfo);

            const response = await axios.put(`/api/course/${courseInfo?.courseId}`, updatedCourseInfo);

            console.log('Updated course:', response.data.updatedCourse);
            onRefresh(true);
        }
        catch (error) {
            console.error('Error updating course info:', error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <FaEdit className="text-primary mx-1" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title and Description</DialogTitle>
                    <DialogDescription>
                        <div className="mt-3">
                            <label htmlFor="">Course Title</label>
                            <Input
                                placeholder="Enter Course title"
                                defaultValue={courseInfo?.courseOutput.topic}
                                onChange={(e) => setCourseTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Description</label>
                            <Textarea
                                className="h-40"
                                placeholder="Enter Course description"
                                defaultValue={courseInfo?.courseOutput.description}
                                onChange={(e) => {
                                    console.log("Textarea value:", e.target.value)
                                    setCourseDescription(e.target.value)
                                }}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={updateCourseInfo}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditCourseBasicInfo