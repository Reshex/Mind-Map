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
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

interface EditItemDialogProps {
    label: string;
    editAction: (label: string) => Promise<void> | void;
    setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}

interface EditItemDialogProps {
    label: string;
    editAction: (label: string) => Promise<void> | void;
    setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function EditItemDialog({ label, editAction, setIsEditDialogOpen }: EditItemDialogProps) {
    const [itemName, setItemName] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleEdit() {
        if (itemName.length < 3) {
            setError("Name must be at least 3 characters long");
            return;
        }

        try {
            await editAction(itemName);
            setItemName("");
            setError(null);
            setIsEditDialogOpen(false);
        } catch (error) {
            console.error("Failed to update item label:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <AlertDialog
            open={true}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit {label}</AlertDialogTitle>
                    <AlertDialogDescription>
                        After confirming, the <span className="text-destructive font-black">{label}</span> name will be updated.
                    </AlertDialogDescription>
                    <Input
                        placeholder={`New ${label} Name`}
                        value={itemName}
                        onChange={(e) => {
                            setError(null);
                            setItemName(e.target.value);
                        }}
                    />
                </AlertDialogHeader>
                {error && <p className="text-destructive mt-2">{error}</p>}
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleEdit}>Edit</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export default EditItemDialog;
