import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";

type DeleteAlertDialogProps = {
    open: boolean;
    setIsOpen: (value: boolean) => void;
    handleDeleteCourse: () => void;
};

export default function DeleteAlertDialog({
    open,
    setIsOpen,
    handleDeleteCourse,
}: DeleteAlertDialogProps) {
    const deleteCourse = () => {
        handleDeleteCourse();
        setIsOpen(false);
    };

    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="max-w-md backdrop-blur-md bg-background/95 border border-border/50 shadow-xl rounded-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <AlertDialogHeader className="gap-4">
                        <motion.div 
                            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10"
                            initial={{ scale: 0.8, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 15 
                            }}
                        >
                            <AlertTriangle className="h-8 w-8 text-destructive" />
                        </motion.div>
                        
                        <AlertDialogTitle className="text-center text-xl font-bold">
                            Delete Course
                        </AlertDialogTitle>
                        
                        <AlertDialogDescription className="text-center text-base">
                            Are you sure you want to delete this course? This action cannot be undone and all course content will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <AlertDialogFooter className="mt-6 flex gap-3">
                        <AlertDialogCancel 
                            onClick={() => setIsOpen(false)}
                            className="mt-0 flex-1 rounded-lg border-border/50 hover:bg-background hover:text-foreground"
                        >
                            Cancel
                        </AlertDialogCancel>
                        
                        <AlertDialogAction 
                            onClick={() => deleteCourse()} 
                            className="flex-1 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm"
                        >
                            <motion.div
                                className="flex items-center justify-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </motion.div>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </motion.div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

