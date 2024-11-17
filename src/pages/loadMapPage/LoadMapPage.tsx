import { useState } from "react";
import LoadingAlert from "@/components/loading/LoadingAlert";
import NewMapCard from "@/components/loadMapCards/createNewMap/CreateNewMapCard";
import LoadMapCards from "@/components/loadMapCards/loadNewMapCard/LoadNewMapCard";

function LoadMap() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <LoadingAlert
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />

            <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-r from-secondary to-muted-secondary">
                <h1 className="text-4xl font-bold text-center mt-28 mb-12">Load Your Map</h1>
                <div className="flex flex-wrap justify-center gap-8 min-w-4-xl max-w-4xl cursor-pointer">
                    <NewMapCard />
                    <LoadMapCards setIsLoading={setIsLoading} />
                </div>

            </div>
        </>
    );
}

export default LoadMap;
