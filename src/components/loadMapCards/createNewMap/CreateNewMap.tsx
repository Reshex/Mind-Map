//Custom components
import { Dispatch, SetStateAction, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Input } from "../../ui/input";
import { Plus, Terminal } from "lucide-react";

//Hooks
import { useNavigate } from "react-router-dom";
import { useCreatorId } from "@/hooks/useCreatorId";

//Types
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";

//Contexts
import { useToast } from "@/context/ToastContext";

//Controllers and Utils
import { Edge, Node } from "reactflow";
import { onSaveMap } from "@/controllers/mapController";
import createInitialNode from "@/utils/createInitialNode";

interface LoadMapPageProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
}

function NewMapCard({ setIsLoading, setError }: LoadMapPageProps) {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [mapName, setMapName] = useState("");
    const [initialNodeName, setInitialNodeName] = useState("");

    const creatorId = useCreatorId();
    const mapId = `map-${crypto.randomUUID()}`;
    const initialEdges: Edge[] = [];

    async function navigateToNewMap() {
        try {
            setError(null);

            if (mapName.length < 3 || initialNodeName.length < 3) {
                setError("Map and Initial Node need more than 2 characters");
                return;
            }

            setIsLoading(true);

            const initialNode: Node<CustomNodeDataType> = await createInitialNode(initialNodeName, mapId);
            const initialNodes: Node<CustomNodeDataType>[] = [initialNode];

            await onSaveMap(mapId, mapName, creatorId, initialNodes, initialEdges);

            addToast({
                title: "Map Created",
                description: `Map successfully created: ${mapName}`,
                icon: <Terminal className="h-4 w-4" />,
            });

            navigate(`/mindMap/${mapId}`);
        } catch (error) {
            console.error("Failed to create new map:", error);
            addToast({
                title: "Map Error",
                description: `Failed to create new map:, ${error}`,
                icon: <Terminal color="#a70000" className="h-4 w-4" />,
            });
            setError("An error occurred while creating the map. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="w-full max-w-md cursor-pointer">
                    <div className="w-full rounded-3xl p-8 bg-gradient-to-br from-secondary to-muted border-2 border-dashed border-muted-foreground shadow-lg hover:shadow-xl text-center transition-transform transform hover:scale-105 hover:border-primary group">
                        <div className="flex justify-center items-center h-full text-muted-foreground group-hover:text-primary transition-colors">
                            <Plus className="h-8 w-8" />
                        </div>
                    </div>
                </div>

            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Map</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-4">
                        <Input
                            value={mapName}
                            onChange={(event) => setMapName(event.target.value)}
                            placeholder="Map Name"
                        />
                        <Input
                            value={initialNodeName}
                            onChange={(event) => setInitialNodeName(event.target.value)}
                            placeholder="Initial Node Name"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={navigateToNewMap}>Create Map</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export default NewMapCard;
