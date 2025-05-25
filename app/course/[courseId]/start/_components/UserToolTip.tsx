import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "lucide-react";
import React from "react";

const UserToolTip = ({
  username,
  userProfileImage,
}: {
  username: string;
  userProfileImage: string;
}) => {
  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-6 w-6 border border-border">
              <AvatarImage src={userProfileImage} alt={username} />
              <AvatarFallback className="text-xs">
                {getInitials(username)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Created by <span className="font-medium text-foreground">{username}</span>
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start" className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src={userProfileImage} alt={username} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{username}</p>
              <p className="text-xs text-muted-foreground">Course Creator</p>
            </div>
          </div>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserToolTip;