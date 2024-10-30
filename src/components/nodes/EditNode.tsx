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
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

interface EditNodeProps {
    editNode: (label: string) => void;
    closeDialog: () => void;
}

function EditNode({ editNode, closeDialog }: EditNodeProps) {
    const [nodeName, setNodeName] = useState("");

    function handleEditNode() {
        editNode(nodeName);
        setNodeName("");
        closeDialog();
    }

    return (
        <AlertDialog open onOpenChange={closeDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle> Edit Node</AlertDialogTitle>
                    <AlertDialogDescription>
                        The node label will be changed.
                    </AlertDialogDescription>
                    <Input
                        placeholder="Edit Node"
                        value={nodeName}
                        onChange={(e) => setNodeName(e.target.value)}
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleEditNode}>Edit</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default EditNode;
