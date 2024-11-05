import { Edge, Node } from "reactflow";
import { loadMapFromDB } from "../db/mapDB";
import CustomNodeDataType from "@/types/nodeTypes/CustomNodeDataType";

interface GetMapProps {
  userId: string;
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export async function getMap({ userId, setNodes, setEdges }: GetMapProps) {
  try {
    const mapData = await loadMapFromDB(userId);
    if (!mapData) return;

    setNodes(mapData.nodes || []);
    setEdges(mapData.edges || []);
    console.log("Map loaded succefully");
  } catch (error) {
    console.error("Failed to load map", error);
  }
}
