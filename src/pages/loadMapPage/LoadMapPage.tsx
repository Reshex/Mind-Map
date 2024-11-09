import CreateNewMap from "@/components/loadMapCards/createNewMap/CreateNewMapCard";
import LoadNewMapCards from "@/components/loadMapCards/loadNewMapCard/LoadNewMapCard";

function LoadMap() {

    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-r from-secondary to-muted-secondary">
            <h1 className="text-4xl font-bold text-center mt-28 mb-12">Load Your Map</h1>
            <div className="flex flex-wrap justify-center gap-8 min-w-4-xl max-w-4xl cursor-pointer">
                <CreateNewMap />
                <LoadNewMapCards />
            </div>
        </div>
    );
}

export default LoadMap;
