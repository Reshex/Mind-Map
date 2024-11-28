import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()

    function navigateToLoadMap() {
        navigate("/loadMap")
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-secondary to-muted-secondary text-foreground p-6">
            <div className="text-center animate-slide-in space-y-8">
                <h1 className="text-6xl font-extrabold mb-6 text-primary animate-pulse">
                    Mind Map
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                    Create and explore your mind maps. Choose how you want to start your journey!
                </p>

                <div className="space-x-6">
                    <Button
                        onClick={navigateToLoadMap}
                        className="px-10 py-6 bg-secondary hover:bg-destructive text-foreground rounded-lg shadow-xl transition-all transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-primary">
                        Regular Mode
                    </Button>
                    <Button
                        onClick={() => alert("Battle Royale Mode coming soon!")}
                        className="px-10 py-6 bg-primary hover:bg-secondary text-foreground rounded-lg shadow-xl transition-all transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-secondary">
                        Battle Royale Mode
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
