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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { onUpdateMap } from "@/controllers/mapController";
import { UserPlus } from "lucide-react";
import { getMapUsersFromDB } from "@/db/mapDB";

interface AddFriendToMapDialogProps {
    mapId: string | undefined;
    creatorId: string | null;
}

function AddFriendToMapDialog({ mapId, creatorId }: AddFriendToMapDialogProps) {
    const [friendId, setFriendId] = useState<string>("");

    async function handleAddFriend() {
        try {
            if (!creatorId) return console.error("User ID not found")
            if (!mapId) return console.error("Map ID not found")

            if (!friendId.trim()) {
                console.error("Friend ID is required");
                return;
            }
            const mapUsersArray = await getMapUsersFromDB(mapId);
            if (!mapUsersArray) return console.error("No users in this map")
            if (mapUsersArray?.includes(friendId)) return console.error("User is already on the list")

            const updatedMapUsers = [...mapUsersArray, friendId]

            await onUpdateMap(creatorId, mapId, { users: updatedMapUsers });

        } catch (error) {
            console.error("Error adding friend to the map:", error);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-secondary z-50 cursor-pointer"><UserPlus /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Friend</AlertDialogTitle>
                    <AlertDialogDescription>
                        It’s always nice to work together. Type your friend’s ID and click on Add Friend.
                    </AlertDialogDescription>
                    <Input
                        value={friendId}
                        onChange={(e) => setFriendId(e.target.value)}
                        placeholder="Friend ID"
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddFriend}>Add Friend</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddFriendToMapDialog;
