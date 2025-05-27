import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoadingDialog = ({
  loading,
  description,
}: {
  loading: boolean;
  description?: string; // Make description optional
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  
  // Simulate progress for better UX
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }
    
    const messages = [
      "Initializing...",
      "Generating course structure...",
      "Creating chapter content...",
      "Finding relevant resources...",
      "Optimizing content...",
      "Almost there...",
      "Finalizing your course..."
    ];
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Increment progress more slowly as we approach 100%
      const increment = currentProgress < 70 ? 
        Math.random() * 10 : 
        Math.random() * 3;
        
      currentProgress = Math.min(currentProgress + increment, 95);
      setProgress(Math.floor(currentProgress));
      
      // Update message based on progress
      const messageIndex = Math.min(
        Math.floor(currentProgress / (100 / messages.length)),
        messages.length - 1
      );
      setLoadingMessage(messages[messageIndex]);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [loading]);
  
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center p-6">
          <AlertDialogTitle className="text-lg mb-2">
            {description ? description : "Creating Your Course"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center mb-4">
            {loadingMessage}
          </AlertDialogDescription>
          
          <div className="w-full mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-right mt-1 text-muted-foreground">{progress}%</p>
          </div>
          
          <div className="py-2">
            <Image
              src={"/rocket.gif"}
              alt="loading"
              width={120}
              height={120}
              priority
              className="mx-auto"
            />
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;