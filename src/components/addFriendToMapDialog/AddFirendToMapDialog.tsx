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
import { getUserFromDB } from "@/db/userDB";
import { User } from "firebase/auth";

interface AddFriendToMapDialogProps {
    mapId: string;
    creatorId: string;
}

function AddFriendToMapDialog({ mapId, creatorId }: AddFriendToMapDialogProps) {
    const [friendId, setFriendId] = useState<string>("");

    async function handleAddFriend() {
        try {
            if (!friendId.trim()) {
                console.error("Friend ID is required");
                return;
            }

            await onUpdateMap(creatorId, mapId, { users: { friendId } });
        } catch (error) {
            console.error("Error adding friend to the map:", error);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-secondary z-50 cursor-pointer">+</Button>
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
