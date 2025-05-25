import { ChapterType } from "@/types/types";
import React from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ChapterListCardProps = {
  chapter: ChapterType;
  index: number;
  isActive?: boolean;
  isCompleted?: boolean;
};

const ChapterListCard = ({ 
  chapter, 
  index, 
  isActive = false,
  isCompleted = false 
}: ChapterListCardProps) => {
  return (
    <div className="p-3 flex items-center gap-3">
      <div className={cn(
        "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : isCompleted 
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-muted text-muted-foreground"
      )}>
        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-medium text-sm truncate",
          isActive ? "text-primary" : "text-foreground"
        )}>
          {chapter.chapterName}
        </h3>
        
        <div className="flex items-center gap-2 mt-1">
          <Clock className={cn(
            "h-3 w-3",
            isActive ? "text-primary" : "text-muted-foreground"
          )} />
          <span className={cn(
            "text-xs",
            isActive ? "text-primary" : "text-muted-foreground"
          )}>
            {chapter.duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChapterListCard;