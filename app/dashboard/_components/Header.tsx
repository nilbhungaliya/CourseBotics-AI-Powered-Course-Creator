import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({props}:any) => {
  return (
      <div className={`flex justify-between items-center p-5 shadow-sm w-full`}>
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={150}
          height={100}
          priority
          className="object-cover"
        />
        <div className="flex gap-10 justify-center items-center">
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      </div>
  );
};

export default Header;
