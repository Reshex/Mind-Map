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
} from "@/components/ui/alert-dialog"
import { Plus } from "lucide-react"
import { Input } from "../ui/input"


function AddNode() {

    function handleAddNode() {
        console.log("ADD NODE")
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger><Plus className='w-3 h-3 hover:text-secondary' /></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Node</AlertDialogTitle>
                    <AlertDialogDescription>
                        New node will be added to the mind map below the selected node.
                    </AlertDialogDescription>
                    <Input placeholder="Add Node" />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddNode}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AddNode
