import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2 text-red-700 dark:text-red-400 text-sm">
      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
};
