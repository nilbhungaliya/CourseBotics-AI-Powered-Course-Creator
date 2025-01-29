"use client";
import React, { useState } from "react";
import { UserInputContext } from "../_context/UserInputContext";
import { CourseType, UserInputType } from "@/types/types";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import Header from "../dashboard/_components/Header";

function CreateCourselayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInput, setUserInput] = useState<UserInputType>({});
  const [userCourseList, setUserCourseList] = useState<CourseType[]>([]);
  return (
    <div>
      <UserInputContext.Provider value={{ userInput, setUserInput }}>
        <UserCourseListContext.Provider
          value={{ userCourseList, setUserCourseList }}
        >
          <>
            <Header />
            <div>{children}</div>
          </>
        </UserCourseListContext.Provider>
      </UserInputContext.Provider>
    </div>
  );
}

export default CreateCourselayout;
