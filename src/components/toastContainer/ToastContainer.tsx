import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/context/ToastContext";
import { Terminal } from "lucide-react";
import { useEffect } from "react";

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    useEffect(() => {
        const timers = toasts.map((toast) =>
            setTimeout(() => removeToast(toast.id), 5000)
        );

        return () => timers.forEach(clearTimeout);
    }, [toasts, removeToast]);

    return (
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {toasts.map((toast) => (
                <Alert
                    key={toast.id}
                    className="animate-slide-in"
                >
                    {toast.icon || <Terminal className="h-4 w-4" />}
                    <div>
                        <AlertTitle>{toast.title}</AlertTitle>
                        <AlertDescription>{toast.description}</AlertDescription>
                    </div>
                </Alert>
            ))}
        </div>
    );
}
