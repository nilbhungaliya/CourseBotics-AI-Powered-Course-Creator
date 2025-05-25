import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Edit, ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteAlertDialog from "./DeleteAlertDialog";

type DropDownOptionsProps = {
    children: React.ReactNode;
    handleDeleteCourse: () => void;
};

export default function DropDownOptions({
    children,
    handleDeleteCourse,
}: DropDownOptionsProps) {
    const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <motion.div 
                        className="cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {children}
                    </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    align="end" 
                    className="w-52 backdrop-blur-md bg-background/80 border border-border/50 shadow-lg rounded-xl p-1"
                >
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2 rounded-lg py-2.5 px-3 focus:bg-primary/10 focus:text-primary">
                        <div className="bg-blue-500/10 text-blue-500 p-1.5 rounded-md">
                            <Edit className="h-4 w-4" />
                        </div>
                        <span>Edit Course</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2 rounded-lg py-2.5 px-3 focus:bg-primary/10 focus:text-primary">
                        <div className="bg-green-500/10 text-green-500 p-1.5 rounded-md">
                            <ExternalLink className="h-4 w-4" />
                        </div>
                        <span>Share</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="my-1" />
                    
                    <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-2 rounded-lg py-2.5 px-3 text-destructive focus:bg-destructive/10 focus:text-destructive"
                        onClick={() => setOpenDeleteAlertDialog(true)}
                    >
                        <div className="bg-destructive/10 text-destructive p-1.5 rounded-md">
                            <Trash2 className="h-4 w-4" />
                        </div>
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteAlertDialog
                open={openDeleteAlertDialog}
                setIsOpen={setOpenDeleteAlertDialog}
                handleDeleteCourse={handleDeleteCourse}
            />
        </div>
    );
};

