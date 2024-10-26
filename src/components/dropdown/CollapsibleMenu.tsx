import { CircleX, Ellipsis, Pencil } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';


function CollapsibleMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis className='size-3 hover:text-secondary' /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Node Settings</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => console.log("clicked")}><Pencil /> Edit Node</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("clicked")}><CircleX />Delete Node</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default CollapsibleMenu