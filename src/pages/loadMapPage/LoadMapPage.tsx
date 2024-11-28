import { useState } from "react";
import LoadingAlert from "@/components/loading/LoadingAlert";
import NewMapCard from "@/components/loadMapCards/createNewMap/CreateNewMap";
import LoadMapCards from "@/components/loadMapCards/loadNewMapCard/LoadNewMap";

function LoadMap() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <>
            <LoadingAlert
                isOpen={isLoading}
                error={error}
                onClose={() => {
                    setIsLoading(false);
                    setError(null);
                }}
            />

            <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-br from-secondary to-secondary-muted">
                <h1 className="text-5xl font-bold text-primary mb-8 bg-gradient-to-r from-primary to-foreground bg-clip-text animate-bounce mt-40">
                    Load Your Mind Map
                </h1>
                <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl">
                    Easily create or load your mind maps to start brainstorming. Select a map below to begin.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl animate-fade-in">
                    <NewMapCard setIsLoading={setIsLoading} setError={setError} />

                    <LoadMapCards setIsLoading={setIsLoading} />
                </div>
            </div>
        </>
    );
}

export default LoadMap;
