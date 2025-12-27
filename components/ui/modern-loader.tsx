import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ModernLoaderProps {
  message?: string;
  submessage?: string;
}

export const ModernLoader: React.FC<ModernLoaderProps> = ({
  message = "Loading...",
  submessage = "Please wait",
}) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated circles */}
        <div className="relative w-24 h-24">
          {/* Outer rotating circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-purple-200 dark:border-purple-900"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              borderTopColor: "rgb(168 85 247)",
            }}
          />
          
          {/* Middle rotating circle */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-blue-200 dark:border-blue-900"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              borderTopColor: "rgb(59 130 246)",
            }}
          />
          
          {/* Center pulsing icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </motion.div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <motion.h3
            className="text-lg font-semibold text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {submessage}
          </motion.p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const FullScreenLoader: React.FC<ModernLoaderProps> = ({
  message = "Loading...",
  submessage = "Please wait",
}) => {
  return (
    <motion.div
      className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModernLoader message={message} submessage={submessage} />
    </motion.div>
  );
};

export const InlineLoader: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex items-center gap-3 py-4 px-6 bg-muted/50 rounded-lg border">
      <div className="relative w-6 h-6">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-200 dark:border-purple-900"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ borderTopColor: "rgb(168 85 247)" }}
        />
      </div>
      <span className="text-sm text-muted-foreground">
        {message || "Loading..."}
      </span>
    </div>
  );
};
