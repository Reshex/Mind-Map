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
import { ShieldCheck, ShieldX, UserPlus } from "lucide-react";
import { getMapUsersFromDB } from "@/db/mapDB";
import { getUsersFromDB } from "@/db/userDB";
import User from "@/types/userTypes/userType";
import { useToast } from "@/context/ToastContext";

interface AddFriendToMapDialogProps {
    mapId: string | undefined;
    creatorId: string | null;
}

function AddFriendToMapDialog({ mapId, creatorId }: AddFriendToMapDialogProps) {
    const [friendId, setFriendId] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { addToast } = useToast();

    async function handleAddFriend() {
        try {
            if (!creatorId) return console.error("User ID not found");
            if (!mapId) return console.error("Map ID not found");

            const users = await getUsersFromDB();
            if (!users) return console.error("No users found");

            if (!users.map((user: User) => user.userId).includes(friendId)) {
                setError("Friend ID not found");
                return;
            }

            const mapUsersArray = await getMapUsersFromDB(mapId);
            if (!mapUsersArray) return console.error("No users in this map");

            if (mapUsersArray.includes(friendId)) {
                setError("User is already on the list");
                return;
            }

            const updatedMapUsers = [...mapUsersArray, friendId];
            await onUpdateMap(creatorId, mapId, { users: updatedMapUsers });

            setError(null);
            setFriendId("");
            setIsDialogOpen(false);
            addToast({
                title: "Friend Added",
                description: "Your friend has been successfully added.",
                icon: <ShieldCheck className="size-5" />,
            });
        } catch (error: any) {
            setError(error.message || "Error Adding Friend.");
            addToast({
                title: "Error Adding Friend",
                description: error.message || "An unexpected error occurred.",
                icon: <ShieldX color="#a70000" className="size-5" />,
            });
        }
    }

    return (
        <AlertDialog open={isDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)} className="bg-secondary z-50 cursor-pointer">
                    <UserPlus />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Friend</AlertDialogTitle>
                    <AlertDialogDescription>
                        It’s always nice to brainstorm together. Type your friend’s ID and click on Add Friend.
                    </AlertDialogDescription>
                    <Input
                        value={friendId}
                        onChange={(e) => setFriendId(e.target.value)}
                        placeholder="Friend ID"
                    />
                </AlertDialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddFriend();
                        }}
                    >
                        Add Friend
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddFriendToMapDialog;
