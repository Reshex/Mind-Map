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
import { useNavigate } from "react-router-dom";
import { useCreatorId } from "@/hooks/useCreatorId"
import { onSaveMap } from "@/controllers/mapController"
import { Edge, Node } from "reactflow";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import createInitialNode from "@/utils/initialNode";


function NewMapCard() {
    const navigate = useNavigate();
    const [mapName, setMapName] = useState("");
    const [initialNodeName, setInitialNodeName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const creatorId = useCreatorId();
    const mapId = `map-${crypto.randomUUID()}`
    const initialNode = createInitialNode(initialNodeName, mapId)

    const initialNodes: Node<CustomNodeDataType>[] = [initialNode];

    const initialEdges: Edge[] = [];


    function navigateToNewMap() {
        try {
            setError(null)

            if (mapName.length < 3 || initialNodeName.length < 3) {
                setError("Map and Initial Node need more than 2 characters");
                return;
            }

            onSaveMap(mapId, mapName, creatorId, initialNodes, initialEdges)
            navigate(`/mindMap/${mapId}`);
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
                        <Input value={mapName} onChange={(event) => setMapName(event.target.value)} placeholder="Map Name"></Input>
                        <Input value={initialNodeName} onChange={(event) => setInitialNodeName(event.target.value)} placeholder="Initial Node Name"></Input>
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