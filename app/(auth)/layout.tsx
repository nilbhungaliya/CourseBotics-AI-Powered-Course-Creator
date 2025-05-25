"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <motion.div
        className="absolute top-6 right-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ThemeToggle />
      </motion.div>
      {children}
    </div>
  );
}