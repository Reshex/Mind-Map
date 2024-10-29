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
import { Pencil } from "lucide-react";
import { Input } from "../ui/input";

function EditNode({ editNode }: { editNode: (label: string) => void }) {
    const [nodeName, setNodeName] = useState("");

    function handleEditNode() {
        editNode(nodeName);
        setNodeName("");
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div>
                    <p className="flex gap-2 items-center"><Pencil className="w-3 h-3 hover:text-secondary" />Edit Node</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Node</AlertDialogTitle>
                    <AlertDialogDescription>
                        New node label will be changed.
                    </AlertDialogDescription>
                    <Input
                        placeholder="Edit Node"
                        value={nodeName}
                        onChange={(e) => setNodeName(e.target.value)}
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleEditNode}>Edit</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default EditNode;
