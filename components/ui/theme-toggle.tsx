"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button variant="ghost" size="icon" className="relative overflow-hidden rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 dark:opacity-100 transition-opacity"
              initial={false}
              animate={{ opacity: theme === 'dark' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-indigo-400" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 backdrop-blur-md bg-background/80 border border-border/50">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2 cursor-pointer">
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 w-full"
          >
            <Sun className="h-4 w-4 text-amber-500" />
            <span>Light</span>
            {theme === 'light' && (
              <motion.div 
                layoutId="theme-check"
                className="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            )}
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2 cursor-pointer">
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex items-center gap-2 w-full"
          >
            <Moon className="h-4 w-4 text-indigo-400" />
            <span>Dark</span>
            {theme === 'dark' && (
              <motion.div 
                layoutId="theme-check"
                className="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            )}
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2 cursor-pointer">
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="flex items-center gap-2 w-full"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4 text-gray-500"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>System</span>
            {theme === 'system' && (
              <motion.div 
                layoutId="theme-check"
                className="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            )}
          </motion.div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}