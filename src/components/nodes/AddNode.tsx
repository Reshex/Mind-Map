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

    function handleAddNode() {
        addNode(nodeName);
        setNodeName("");
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
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
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddNode}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddNode;
