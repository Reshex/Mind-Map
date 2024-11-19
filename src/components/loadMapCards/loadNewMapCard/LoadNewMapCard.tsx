import CollapsibleMenu from "@/components/dropdown/CollapsibleMenu";
import EditItemDialog from "@/components/nodes/EditItemDialog";
import { loadMapFromDB } from "@/db/mapDB";
import { useCreatorId } from "@/hooks/useCreatorId";
import { Map } from "@/types/mapTypes/mapType";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { editMapCardName, removeMapCard } from "./loadNewMapCardsCont";

interface LoadMapPageProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

function LoadMapCards({ setIsLoading }: LoadMapPageProps) {
    const creatorId = useCreatorId();
    const navigate = useNavigate();
    const [mapsList, setMapsList] = useState<Map[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        async function getMaps() {
            setIsLoading(true);
            if (creatorId === null) return;

            const maps = await loadMapFromDB(creatorId);
            if (maps) setMapsList(Array.isArray(maps) ? maps : [maps]);
            setIsLoading(false);
        }
        getMaps();
    }, [creatorId, refreshTrigger]);

    function navigateToMap(mapId: string) {
        navigate(`/mindMap/${mapId}`);
    }

    return (
        <>
            {mapsList.map((map) => (
                <div
                    onClick={() => navigateToMap(map.mapId)}
                    key={map.mapId}
                    className="w-screen rounded-2xl p-6 bg-primary shadow-md text-center transition-all transform hover:scale-105 hover:ring ring-foreground group">
                    <h1 className="text-4xl font-normal group-hover:font-extralight transition-all">
                        {(map.mapName).toLocaleUpperCase()}
                    </h1>
                    <div className="absolute top-2 right-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CollapsibleMenu
                            label="Map"
                            editAction={(newLabel) => editMapCardName(map.mapId, { mapName: newLabel }, setRefreshTrigger, refreshTrigger)}
                            deleteAction={() => removeMapCard(map.mapId, setRefreshTrigger, refreshTrigger)}
                            EditComponent={({ closeDialog, editAction }) => (
                                <EditItemDialog
                                    label="Map"
                                    editAction={editAction}
                                    closeDialog={closeDialog}
                                />
                            )}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}

export default LoadMapCards;
