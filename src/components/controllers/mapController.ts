import { Edge, Node } from "reactflow";
import { loadMapFromDB, saveMapToDB } from "../db/mapDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { Map } from "@/types/mapTypes/mapType";
import SanitizedNode from "@/types/nodeTypes/customNodeDataType";

interface GetMapProps {
  userId: string;
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export async function onSaveMap(
  mapId: string,
  userId: string | null,
  nodes: Node<CustomNodeDataType>[],
  edges: Edge[]
) {
  try {
    const sanitizedNodes: SanitizedNode[] | any = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: {
        label: node.data.label || "",
        parentId: node.data.parentId || "",
      },
      position: node.position,
    }));
    const sanitizedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));
    const map: Map = { mapId, userId, nodes: sanitizedNodes, edges: sanitizedEdges };
    await saveMapToDB(map);
  } catch (error) {
    console.error("Failed to save map", error);
  }
}

export async function onGetMap({ userId, setNodes, setEdges }: GetMapProps) {
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
