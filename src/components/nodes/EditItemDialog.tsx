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

interface EditItemDialogProps {
    label: string;
    editAction: (label: string) => Promise<void> | void;
    closeDialog: () => void;
}

interface EditItemDialogProps {
    label: string;
    editAction: (label: string) => Promise<void> | void;
    closeDialog: () => void;
}

function EditItemDialog({ label, editAction, closeDialog }: EditItemDialogProps) {
    const [itemName, setItemName] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleEdit() {
        if (itemName.length < 2) {
            setError("Name must be more than 2 characters long");
            return;
        }
        try {
            await editAction(itemName);
            setItemName("");
            closeDialog();
        } catch (err) {
            setError("Failed to update name");
        }
    }

    return (
        <AlertDialog open onOpenChange={closeDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit {label}</AlertDialogTitle>
                    <AlertDialogDescription>
                        The {label} name will be updated.
                    </AlertDialogDescription>
                    <Input
                        placeholder={`Edit ${label}`}
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </AlertDialogHeader>
                {error !== null && <p className="text-red-500 text-sm">{error}</p>}
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleEdit}>Edit</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export default EditItemDialog;
