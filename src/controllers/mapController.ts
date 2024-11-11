import { Edge, Node } from "reactflow";
import { loadMapFromDB, saveMapToDB } from "../db/mapDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { Map } from "@/types/mapTypes/mapType";
import SanitizedNode from "@/types/nodeTypes/customNodeDataType";
import { updateUserToDB } from "../db/userDB";

interface GetMapProps {
  userId: string;
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeDataType>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export async function onSaveMap(
  mapId: string,
  mapName: string | "",
  creatorId: string | null,
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

    if (creatorId === null) return;
    const newMap: Map = { mapId, mapName, creatorId, nodes: sanitizedNodes, edges: sanitizedEdges };

    await saveMapToDB(newMap);
    await updateUserToDB(creatorId, { maps: [newMap] });
  } catch (error) {
    console.error("Failed to save map", error);
  }
}

export async function onGetMaps({ userId, setNodes, setEdges }: GetMapProps) {
  try {
    const mapData = await loadMapFromDB(userId);
    if (!mapData) return;

    console.log(mapData);
    // setNodes(mapData.nodes || []);
    // setEdges(mapData.edges || []);
    console.log("Map loaded succefully");
  } catch (error) {
    console.error("Failed to load map", error);
  }
}
