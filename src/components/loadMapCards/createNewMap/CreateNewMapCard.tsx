import { useState } from "react"

//Custom components
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../../ui/input"
import { Plus } from "lucide-react"
import useMapContext from "@/hooks/useMapContext"
import { useNavigate } from "react-router-dom";


function NewMapCard() {
    const { setMapName, setInitialNodeName } = useMapContext()
    const navigate = useNavigate();
    const [localMapName, setLocalMapName] = useState("");
    const [localNodeName, setLocalNodeName] = useState("");
    const [error, setError] = useState<string | null>(null);


    // Key problem - new map that is created is not saved as individual map, instead it overwrites the first map
    // Could be that the solution is to save the map without getting the mapId first and add another function that updates the map
    
    function navigateToNewMap() {
        try {
            setError(null)

            if (localMapName.length < 3 || localNodeName.length < 3) {
                setError("Map and Initial Node need more than 2 characters");
                return;
            }

            setMapName(localMapName);
            setInitialNodeName(localNodeName);
            navigate(`/mindMap/new`);

        }
        catch (error) {
            console.error("Falied to create new map")
        }

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="flex flex-wrap justify-center gap-8 min-w-4-xl max-w-4xl cursor-pointer">
                    <div className="w-screen rounded-2xl p-6 bg-secondary border-2 border-dashed border-foreground shadow-md text-center transition-all transform hover:scale-105 hover:border-primary">
                        <div className="flex justify-center items-center">
                            <Plus />
                        </div>
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Map</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-4" >
                        <Input value={localMapName} onChange={(event) => setLocalMapName(event.target.value)} placeholder="Map Name"></Input>
                        <Input value={localNodeName} onChange={(event) => setLocalNodeName(event.target.value)} placeholder="Initial Node Name"></Input>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>

                    {error && (
                        <div className="text-destructive font-semibold">
                            {error}
                        </div>
                    )}
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => navigateToNewMap()}>Create Map</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default NewMapCard