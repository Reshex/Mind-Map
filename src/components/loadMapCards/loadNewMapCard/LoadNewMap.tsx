//imports
import { useState, useEffect, Dispatch, SetStateAction } from "react";

//db
import { loadMapFromDB } from "@/db/mapDB";

//hooks
import { useCreatorId } from "@/hooks/useCreatorId";
import { useNavigate } from "react-router-dom";

//types
import { Map } from "@/types/mapTypes/mapType";

//custom components
import CollapsibleMenu from "@/components/dropdown/CollapsibleMenu";
import EditItemDialog from "@/components/editItemDialog/EditItemDialog";
import { editMapName, removeMap } from "./loadNewMapCont";
import { useToast } from "@/context/ToastContext";
import { Terminal } from "lucide-react";

interface LoadMapPageProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

function LoadMapCards({ setIsLoading }: LoadMapPageProps) {
    const creatorId = useCreatorId();
    const navigate = useNavigate();
    const { addToast } = useToast()
    const [mapsList, setMapsList] = useState<Map[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        async function getMaps() {
            setIsLoading(true);
            if (creatorId === null) return console.error("Creator Id cannot be null");

            const maps = await loadMapFromDB(creatorId);
            if (maps) setMapsList(Array.isArray(maps) ? maps : [maps]);
            setIsLoading(false);
        }
        getMaps();
    }, [creatorId, refreshTrigger]);

    function navigateToMap(mapId: string) {
        navigate(`/mindMap/${mapId}`);
        addToast({
            title: "Map Loaded",
            description: `Map loaded successfully and free to use`,
            icon: <Terminal className="h-4 w-4" />,
        });
    }

    return (
        <>
            {mapsList.map((map) => (
                <div
                    onClick={() => navigateToMap(map.mapId)}
                    key={map.mapId}
                    className="w-full max-w-md max-h-64 p-8 bg-gradient-map rounded-3xl shadow-lg text-center transition-all transform hover:scale-110 hover:shadow-2xl hover:ring-4 ring-pink-400 group cursor-pointer overflow-hidden"
                >
                    <h1
                        className="text-3xl font-semibold text-foreground tracking-wide transition-all group-hover:text-gray-200 truncate"
                        title={map.mapName.toLocaleUpperCase()}
                    >
                        {map.mapName.toLocaleUpperCase()}
                    </h1>

                    <div
                        className="absolute top-2 right-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CollapsibleMenu
                            label="Map"
                            editAction={(newLabel) =>
                                editMapName(
                                    creatorId!,
                                    map.mapId,
                                    addToast,
                                    { mapName: newLabel },
                                    setRefreshTrigger,
                                    refreshTrigger
                                )
                            }
                            deleteAction={() =>
                                removeMap(
                                    creatorId!,
                                    map.mapId,
                                    map.mapName,
                                    addToast,
                                    setRefreshTrigger,
                                    refreshTrigger,
                                    setIsLoading
                                )
                            }
                            EditComponent={({ setIsEditDialogOpen, editAction }) => (
                                <EditItemDialog
                                    label="Map"
                                    editAction={editAction}
                                    setIsEditDialogOpen={setIsEditDialogOpen}
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
