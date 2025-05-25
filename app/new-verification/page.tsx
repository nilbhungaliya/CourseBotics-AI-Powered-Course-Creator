"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { newVerificationAction } from "../_actions/new-verification";

const NewVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(true);

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing verification token!");
      setIsPending(false);
      return;
    }

    try {
      setIsPending(true);
      const data = await newVerificationAction(token);

      if (data.error) {
        setError(data.error);
      }

      if (data.success) {
        setSuccess(data.success);
      }
    } catch (_) {
      setError("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-lg border-0 dark:bg-gray-800/60 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Email Verification
              </CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardDescription>
                Confirming your email address
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
            {isPending && (
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center space-y-4"
              >
                <BeatLoader color="#3b82f6" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Verifying your email...
                </p>
              </motion.div>
            )}
            
            {!isPending && success && (
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center space-y-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
                </div>
                <p className="text-center font-medium text-gray-700 dark:text-gray-300">
                  {success}
                </p>
              </motion.div>
            )}
            
            {!isPending && error && (
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center space-y-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                  <XCircle className="h-12 w-12 text-red-600 dark:text-red-500" />
                </div>
                <p className="text-center font-medium text-gray-700 dark:text-gray-300">
                  {error}
                </p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            <motion.div 
              variants={itemVariants}
              className="w-full"
            >
              <Link href="/sign-in" className="w-full">
                <Button 
                  variant="default" 
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
                >
                  Back to Login
                </Button>
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default NewVerificationPage;