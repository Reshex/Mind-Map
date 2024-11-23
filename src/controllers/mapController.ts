import { Edge, Node } from "reactflow";
import { saveMapToDB, updateMapToDB } from "../db/mapDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { Map } from "@/types/mapTypes/mapType";
import sanitizeNodes from "@/utils/sanitizeNodes";
import { saveMapToUserDB, updateMapToUserDB } from "@/db/userDB";
import deepSanitize from "@/utils/deepSanitize";

export async function onSaveMap(
  mapId: string,
  mapName: string,
  creatorId: string | null,
  nodes: Node<CustomNodeDataType>[],
  edges: Edge[]
) {
  try {
    const sanitizedNodes = sanitizeNodes(nodes);

    const sanitizedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: {
        mapId,
      },
    }));

    if (creatorId === null) return;
    const newMap: Map = { mapId, mapName, creatorId, nodes: sanitizedNodes, edges: sanitizedEdges };

    await saveMapToDB(newMap);
    await saveMapToUserDB(creatorId, newMap);
  } catch (error) {
    console.error("Failed to save map", error);
  }
}

export async function onUpdateMap(creatorId: string, mapId: string, values: Partial<Map>) {
  try {
    const sanitizedValues = deepSanitize(values);
    updateMapToDB(mapId, sanitizedValues);
    updateMapToUserDB(creatorId, values);
  } catch (error) {
    console.error("Failed to update map", error);
  }
}

// export async function removeMap(selectedMapId: string) {
//   try {
//     if (!selectedMapId) return;
//     await removeMapFromDB(selectedMapId);
//   } catch (error) {
//     console.error("Failed to delete map", error);
//   }
// }
