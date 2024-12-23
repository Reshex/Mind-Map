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
        <div className="fixed bottom-4 right-4 space-y-3 z-50">
            {toasts.map((toast) => (
                <Alert
                    key={toast.id}
                    className="animate-slide-in flex items-center gap-3 bg-gradient-initial shadow-lg rounded-2xl px-4 py-3 text-card-foreground"
                >
                    {toast.icon || (
                        <Terminal className="h-6 w-6 text-primary-foreground bg-card p-1 rounded-full" />
                    )}
                    <div className="flex flex-col">
                        <AlertTitle className="font-semibold text-lg">{toast.title}</AlertTitle>
                        <AlertDescription className="text-sm">{toast.description}</AlertDescription>
                    </div>
                </Alert>
            ))}
        </div>
    );
}
