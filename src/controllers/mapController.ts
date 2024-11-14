import { Edge, Node } from "reactflow";
import { saveMapToDB, updateMapToDB } from "../db/mapDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { Map } from "@/types/mapTypes/mapType";
import { updateUserToDB } from "../db/userDB";

export async function onSaveMap(
  mapId: string,
  mapName: string | "",
  creatorId: string | null,
  nodes: Node<CustomNodeDataType>[],
  edges: Edge[]
) {
  try {
    const sanitizedNodes: Node<CustomNodeDataType> = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: {
        label: node.data.label,
        parentId: node.data.parentId,
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

    if (newMap.creatorId === creatorId) return;

    await updateUserToDB(creatorId, { maps: [newMap] });
  } catch (error) {
    console.error("Failed to save map", error);
  }
}

export async function onUpdateMap(mapId: string, values: Partial<Map>) {
  try {
    updateMapToDB(mapId, values);
  } catch (error) {
    console.error("Failed to update map", error);
  }
}
