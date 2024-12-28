import { useEffect, useState } from "react";

//DB
import { Input } from "@/components/ui/input";
import { updateUserToDB } from "@/db/userDB";

//Utils
import { fetchUserData } from "@/utils/fetchUserData";

//Hooks
import { useCreatorId } from "@/hooks/useCreatorId";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

//Custom Components
import LoadingAlert from "@/components/loading/LoadingAlert";
import { Button } from "@/components/ui/button";
import ChangePasswordDialog from "@/components/changePasswordDialog/ChangePasswordDialog";
import DeleteAccountDialog from "@/components/deleteAccountDialog/DeleteAccountDialog";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Switch } from "@/components/ui/switch";

function UserSettingsPage() {
    const userId = useCreatorId();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const { addToast } = useToast();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (!userId) {
            setError("Failed to fetch user ID");
            setIsLoading(false);
            return;
        }

        fetchUserData(userId, setError, setName, setLastName, setEmail, setIsLoading);
    }, [userId]);


    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    async function handleSave() {
        try {
            if (!userId) return console.error("User ID not found")

            await updateUserToDB(userId, { name, lastName, email })

            addToast({
                title: "User Details Changed",
                description: "Your details have been successfully updated.",
                icon: <ShieldCheck className="size-5" />,
            });

            navigate("/")
        }
        catch (error: any) {
            console.error("Failed to save user details", error)
            addToast({
                title: "User Details Changed Error",
                description: error.message,
                icon: <ShieldX color="#a70000" className="size-5" />,
            });
        }
    }

    function handleCancel() {
        addToast({
            title: "User Details Reset",
            description: "Your details have been resetted.",
            icon: <ShieldCheck className="size-5" />,
        });
        navigate("/")
    }

    return (
        <>
            <LoadingAlert
                isOpen={isLoading || !!error}
                error={error}
                onClose={() => setError(null)}
            />
            <div className="min-h-screen bg-gradient-to-r from-secondary to-muted-secondary text-foreground">
                <div className="max-w-5xl mx-auto p-8">
                    <h1 className="text-4xl font-bold text-center mb-12 mt-24">User Settings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-muted-secondary rounded-lg shadow-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Advanced Settings</h2>
                            <ul className="space-y-2">
                                <ChangePasswordDialog />
                                <DeleteAccountDialog userId={userId!} />
                            </ul>
                        </div>

                        <div className="col-span-2 bg-background rounded-lg shadow-lg p-6 space-y-6">
                            <h2 className="text-2xl font-semibold">Account Settings</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <p>{email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    User ID
                                </label>
                                <p>{userId}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Last Name
                                </label>
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                    className="w-full"
                                />
                            </div>
                            <hr />
                            <h2 className="text-2xl font-semibold">Appearance</h2>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Toggle Visibility Mode</span>
                                <Switch
                                    onCheckedChange={toggleTheme}
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-muted hover:bg-muted-foreground text-foreground rounded-lg shadow transition-all"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-primary hover:bg-destructive rounded-lg shadow transition-all"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default UserSettingsPage;
