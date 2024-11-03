import { Plus } from "lucide-react";

function LoadMap() {
    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-r from-secondary to-muted-secondary">
            <h1 className="text-4xl font-bold text-center mt-28 mb-12">Load Your Map</h1>
            <div className="flex flex-wrap justify-center gap-8 min-w-4-xl max-w-4xl cursor-pointer">
                <div className="w-screen rounded-2xl p-6 bg-secondary border-2 border-dashed border-foreground shadow-md text-center transition-all transform hover:scale-105 hover:border-primary">
                    <div className="flex justify-center items-center">
                        <Plus size={50} />
                    </div>
                </div>
                <div className="w-screen rounded-2xl p-6 bg-primary shadow-md text-center transition-all transform hover:scale-105 hover:ring ring-foreground">
                    <h2 className="text-xl font-semibold mb-2">Card 1</h2>
                    <p className="text-foreground">Content for the first card goes here.</p>
                </div>
            </div>
        </div>
    );
}

export default LoadMap;
