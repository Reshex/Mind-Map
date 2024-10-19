import { Button } from "@/components/ui/button"

function HomePage() {

    return (
        <div className="h-screen flex justify-center items-center">
            <h1>Mind Map</h1>
            <Button>Mind Map Mode</Button>
            <Button>Battle Royale Mode</Button>
        </div>
    )
}

export default HomePage