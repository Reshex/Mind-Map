import { useState } from 'react';
import { CircleX, Ellipsis, Pencil } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import EditNode from '../nodes/EditNode';

interface CollapsibleMenuProps {
    removeNode: () => void;
    editNode: (label: string) => void;
}

function CollapsibleMenu({ removeNode, editNode }: CollapsibleMenuProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger><Ellipsis className='size-3 hover:text-secondary' /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Node Settings</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                        <Pencil className="w-3 h-3 hover:text-secondary" /> Edit Node
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => removeNode()}><CircleX />Delete Node</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isEditDialogOpen && (
                <EditNode
                    editNode={editNode}
                    closeDialog={() => setIsEditDialogOpen(false)}
                />
            )}
        </>
    );
}

export default CollapsibleMenu;
