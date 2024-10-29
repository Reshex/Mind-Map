import { CircleX, Ellipsis } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import EditNode from '../nodes/EditNode';

interface CollapsibleMenuProps {
    removeNode: () => void
    editNode: () => void
}

function CollapsibleMenu({ removeNode, editNode }: CollapsibleMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis className='size-3 hover:text-secondary' /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Node Settings</DropdownMenuLabel>
                <DropdownMenuItem> <EditNode editNode={editNode} /></DropdownMenuItem>
                <DropdownMenuItem onClick={() => removeNode()}><CircleX />Delete Node</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default CollapsibleMenu