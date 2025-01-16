"use client";
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import React, { JSX } from 'react'

export const Header = () => {
    const { user } = useUser();
    return (
        <div className="flex justify-between items-center p-5 shadow-sm">
            <Image src={"/logo.svg"} alt="logo" width={150} height={150} className="object-cover ml-4" />
            {!user ? (
            <div className='flex gap-5'>
                <Link href="/sign-up">
                    <Button className='text-white hover:bg-primary-foreground font-semibold px-6 py-5 rounded-md'>Sign up</Button>
                </Link>
                <Link href="/sign-in">
                    <Button className='text-white hover:bg-primary-foreground font-semibold px-6 py-5 rounded-md'>Sign in</Button>
                </Link>
            </div>
            ) : (
            <Link href="/dashboard">
                <Button>Dashboard</Button>
            </Link>
            )}
        </div>
    )
}


