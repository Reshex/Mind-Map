import { Dispatch, SetStateAction, useState } from "react";
import { CircleX, Ellipsis, Pencil } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface CollapsibleMenuProps {
    label: string;
    editAction: (label: string) => Promise<void> | void;
    deleteAction?: () => Promise<void> | void;
    EditComponent: React.FC<{
        setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
        editAction: (label: string) => Promise<void> | void;
    }>;
    showDeleteOption?: boolean;
}

function CollapsibleMenu({
    label,
    editAction,
    deleteAction,
    EditComponent,
    showDeleteOption = true,
}: CollapsibleMenuProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis className="size-fit hover:text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{label} Settings</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                        <Pencil className="w-3 h-3 hover:text-secondary" /> Edit {label}
                    </DropdownMenuItem>
                    {showDeleteOption && deleteAction && (
                        <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                            <CircleX /> Delete {label}
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {isEditDialogOpen && (
                <EditComponent editAction={editAction} setIsEditDialogOpen={setIsEditDialogOpen} />
            )}

            {/* Delete Confirmation Dialog */}
            {showDeleteOption && deleteAction && (
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this {label}? This action cannot be undone and remove the whole data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel >Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    deleteAction();
                                    setIsDeleteDialogOpen(false);
                                }}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}

export default CollapsibleMenu;
