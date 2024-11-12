import { MapContext } from "@/context/MapContext";
import { useContext } from "react";

export default function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
}
