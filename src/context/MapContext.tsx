import { createContext, ReactNode, useState } from "react";

interface MapContextType {
    mapName: string;
    initialNodeName: string;
    setMapName: (name: string) => void;
    setInitialNodeName: (name: string) => void;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
    const [mapName, setMapName] = useState("");
    const [initialNodeName, setInitialNodeName] = useState("");

    return (
        <MapContext.Provider value={{ mapName, setMapName, initialNodeName, setInitialNodeName }}>
            {children}
        </MapContext.Provider>
    );
}

