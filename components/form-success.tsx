import { CheckCircleIcon} from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="mb-4 p-3 bg-greeen-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-2 text-green-600 dark:green-400 text-sm">
      <CheckCircleIcon className="h-5 w-5 shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
};
