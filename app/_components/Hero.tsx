"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

function Hero() {
    return (
        <section className="bg-gray-50 mt-[-60]">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        AI-Powered Course Creator
                        <strong className="font-extrabold text-primary sm:block">Create Your Own Course By AI</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed font-semibold leading-none">
                        Revolutionize your Course creation with our AI-powered App. Delevering, engaging and high quality courses in minutes.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/sign-up">
                            <Button className='text-white hover:bg-primary-foreground font-semibold px-10 rounded-full py-6'>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero