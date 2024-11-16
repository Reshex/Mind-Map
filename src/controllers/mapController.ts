import { Edge, Node } from "reactflow";
import { saveMapToDB } from "../db/mapDB";
import CustomNodeDataType from "@/types/nodeTypes/customNodeDataType";
import { Map } from "@/types/mapTypes/mapType";
import { updateUserToDB } from "../db/userDB";
import sanitizeNodes from "@/utils/sanitizeNodes";

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

    if (newMap.creatorId === creatorId) return;

    await updateUserToDB(creatorId, { maps: [newMap] });
  } catch (error) {
    console.error("Failed to save map", error);
  }
}

// export async function onUpdateMap(mapId: string, values: Partial<Map>) {
//   try {
//     if (values.nodes) {
//       sanitizeNodes(values.nodes);
//     }
//     updateMapToDB(mapId, values);
//   } catch (error) {
//     console.error("Failed to update map", error);
//   }
// }
