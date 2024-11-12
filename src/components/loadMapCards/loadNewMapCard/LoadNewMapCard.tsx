import { loadMapFromDB } from "@/db/mapDB";
import { useCreatorId } from "@/hooks/useCreatorId";
import { Map } from "@/types/mapTypes/mapType";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadMapCards() {
    const creatorId = useCreatorId();
    const navigate = useNavigate();
    const [mapsList, setMapsList] = useState<Map[]>([]);

    useEffect(() => {
        async function getMaps() {
            if (creatorId === null) return;

            const maps = await loadMapFromDB(creatorId);
            if (maps) setMapsList(Array.isArray(maps) ? maps : [maps]);
        }

        getMaps();
    }, [creatorId]);

    function navigateToMap(mapId: string) {
        navigate(`/mindMap/${mapId}`); 
    }

    return (
        <>
            {mapsList.map((map) => (
                <div 
                    onClick={() => navigateToMap(map.mapId)}
                    key={map.mapId}
                    className="w-screen rounded-2xl p-6 bg-primary shadow-md text-center transition-all transform hover:scale-105 hover:ring ring-foreground">
                    <h2 className="text-xl font-semibold mb-2">{map.mapName}</h2>
                </div>
            ))}
        </>
    );
}

export default LoadMapCards;
