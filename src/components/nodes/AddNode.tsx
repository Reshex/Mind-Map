import { useState } from "react";
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
import { Plus } from "lucide-react";
import { Input } from "../ui/input";

function AddNode({ addNode }: { addNode: (label: string) => void }) {
    const [nodeName, setNodeName] = useState("");
    const [error, setError] = useState<string | null>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    function handleAddNode() {
        if (nodeName.trim().length < 2) {
            setError("Node name must be at least 2 characters long");
            return;
        }
        addNode(nodeName);
        setNodeName("");
        setError(null);
        setIsDialogOpen(false);
    }

    return (
        <AlertDialog open={isDialogOpen}>
            <AlertDialogTrigger onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-3 h-3 hover:text-secondary" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Node</AlertDialogTitle>
                    <AlertDialogDescription>
                        New node will be added to the mind map below the selected node.
                    </AlertDialogDescription>
                    <Input
                        placeholder="Add Node"
                        value={nodeName}
                        onChange={(e) => setNodeName(e.target.value)}
                    />
                </AlertDialogHeader>
                {error && <div className="text-red-500">{error}</div>}
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => {
                        e.preventDefault();
                        handleAddNode();
                    }}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddNode;
