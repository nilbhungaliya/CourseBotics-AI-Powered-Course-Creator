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
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface LoadingStage {
  id: number;
  title: string;
  description: string;
  status: "pending" | "active" | "completed";
}

const LoadingDialog = ({
  loading,
  description,
}: {
  loading: boolean;
  description?: string;
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stages, setStages] = useState<LoadingStage[]>([
    {
      id: 1,
      title: "Analyzing Requirements",
      description: "Processing your course details...",
      status: "active",
    },
    {
      id: 2,
      title: "Generating Course Structure",
      description: "AI is creating your course outline...",
      status: "pending",
    },
    {
      id: 3,
      title: "Creating Chapters",
      description: "Building chapter content and descriptions...",
      status: "pending",
    },
    {
      id: 4,
      title: "Saving to Database",
      description: "Storing your course data securely...",
      status: "pending",
    },
  ]);

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setCurrentStageIndex(0);
      setStages((prev) =>
        prev.map((stage) => ({ ...stage, status: "pending" as const }))
      );
      return;
    }

    let currentProgress = 0;
    let stageIndex = 0;

    const interval = setInterval(() => {
      // Calculate progress increment
      const increment = currentProgress < 80 ? Math.random() * 8 : Math.random() * 2;
      currentProgress = Math.min(currentProgress + increment, 98);
      setProgress(Math.floor(currentProgress));

      // Update stages based on progress
      const newStageIndex = Math.min(
        Math.floor((currentProgress / 100) * stages.length),
        stages.length - 1
      );

      if (newStageIndex !== stageIndex) {
        stageIndex = newStageIndex;
        setCurrentStageIndex(stageIndex);

        setStages((prevStages) =>
          prevStages.map((stage, idx) => {
            if (idx < stageIndex) {
              return { ...stage, status: "completed" };
            } else if (idx === stageIndex) {
              return { ...stage, status: "active" };
            }
            return { ...stage, status: "pending" };
          })
        );
      }
    }, 800);

    return () => clearInterval(interval);
  }, [loading, stages.length]);

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader className="space-y-4">
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
          </div>
          
          <AlertDialogTitle className="text-2xl text-center">
            {description || "Creating Your AI-Powered Course"}
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-center text-base">
            Please wait while we generate your personalized course content
          </AlertDialogDescription>

          {/* Progress Bar */}
          <div className="w-full space-y-2 pt-4">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {stages[currentStageIndex]?.title || "Processing..."}
              </span>
              <span className="font-semibold text-purple-600">{progress}%</span>
            </div>
          </div>

          {/* Stages List */}
          <div className="space-y-3 pt-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                  stage.status === "active"
                    ? "bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
                    : stage.status === "completed"
                    ? "bg-green-50 dark:bg-green-950/20"
                    : "bg-gray-50 dark:bg-gray-900/50"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {stage.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : stage.status === "active" ? (
                    <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-sm ${
                      stage.status === "active"
                        ? "text-purple-700 dark:text-purple-400"
                        : stage.status === "completed"
                        ? "text-green-700 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Animated Image */}
          <div className="flex justify-center pt-4">
            <Image
              src={"/rocket.gif"}
              alt="loading"
              width={100}
              height={100}
              priority
              className="opacity-80"
            />
          </div>

          <p className="text-center text-xs text-muted-foreground pt-2">
            This may take 10-30 seconds depending on your course complexity
          </p>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;