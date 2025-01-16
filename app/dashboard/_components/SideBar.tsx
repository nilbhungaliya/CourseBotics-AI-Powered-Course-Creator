"use client"
import Link from "next/link";
import React, { useContext } from "react";
// import { Layout, Compass, Shield } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { RotatingText } from "./RotatingText";
import { navList } from "../_constants/navList";
import { usePathname } from "next/navigation";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function SideBav() {
  const path = usePathname();
  const { userCourseList } = useContext(UserCourseListContext);

  return (
    <aside className="md:w-64 h-full fixed border-r px-4 py-5 flex flex-col">
      <div className="mb-6 mx-auto">
        <RotatingText />
      </div>
      <hr className="mb-5" />
      <ul className="font-semibold">
        {
          navList.map((item) => {
            return (
              <div key={item.id} className={`space-y-2 my-3 hover:bg-zinc-200  rounded-lg transition-all duration-200 font-semibold ${item.route === path && 'bg-gray-100'}`}>
                <Link
                  href={item.route}
                  key={item.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary-foreground cursor-pointer hover:text-gray-800"
                >
                  <item.icon className="w-5 h-5 text-gray-700 " />
                  <div className="text-gray-700">
                    {item.name}
                  </div>
                </Link>
              </div>
            )
          })
        }
      </ul>

      {/* <div className="mx-auto absolute bottom-20">
        <Progress value={33} className="h-1 mb-2" />
        <h2 className="text-sm text-gray-700 font font-semibold leading-10">1 out of 5 Courses created</h2>
        <h2 className="text-xs text-muted-foreground">Upgrade your Plan for Unlimited</h2>
      </div> */}
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList.length / 5) * 100} />
        <h2 className="text-sm my-2">
          {userCourseList.length} out of 5 Courses created
        </h2>
        <Link href="/upgrade">
          <h2 className="text-xs text-gray-500">
            Upgrade your Plan for Unlimited
          </h2>
        </Link>
      </div>
    </aside>
  );
}

export default SideBav;
