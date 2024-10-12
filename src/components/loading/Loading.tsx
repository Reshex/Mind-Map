import { Loader2 } from 'lucide-react';

function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="relative">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <div className="absolute inset-0 rounded-full bg-primary opacity-25 animate-ping"></div>
            </div>
            <p className="ml-4 text-xl font-semibold text-foreground">Loading...</p>
        </div>
    );
};

export default Loading;