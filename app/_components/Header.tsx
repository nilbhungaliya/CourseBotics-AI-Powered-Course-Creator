"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative w-[120px] h-[40px] sm:w-[150px] sm:h-[50px]"
          >
            <Image
              src={"/courseBotics-logo.svg"}
              alt="CourseBotics"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <div className="flex gap-2 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="rounded-full px-3 sm:px-6 py-2 h-9 text-xs sm:text-sm"
                >
                  Sign in
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link href="/sign-up">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-3 sm:px-6 py-2 h-9 text-xs sm:text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                  Sign up
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
