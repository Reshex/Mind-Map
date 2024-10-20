import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()

    function navigateToRegularMode() {
        navigate("/regularMindMap")
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-secondary to-muted-secondary text-foreground">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-12 animate-pulse">Mind Map</h1>
                <div className="space-x-4">
                    <Button onClick={navigateToRegularMode} className="px-10 py-8 bg-secondary hover:bg-destructive text-foreground rounded-lg shadow-lg transition-all transform hover:scale-110 hover:text-base focus:ring-2 focus:ring-foreground">
                        Regular Mode
                    </Button>
                    <Button className="px-6 py-8 bg-primary hover:bg-destructive text-foreground rounded-lg shadow-lg transition-all transform hover:scale-110 hover:text-base focus:ring-2 focus:ring-foreground">
                        Battle Royale Mode
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default HomePage